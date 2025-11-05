import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import React from 'react';
import { createRoot } from 'react-dom/client';

export type ExportPdfOptions = {
  filename?: string;
  pageFormat?: {
    width: number;
    height: number;
  };
  paddingPx?: number;
  canvasScale?: number;
  containerWidth?: string;
  containerHeight?: string;
  orientation?: 'portrait' | 'landscape';
  wrapper?: (node: React.ReactElement) => React.ReactElement;
};

const defaultA4 = { width: 595.28, height: 841.89 };

export async function exportElementToPdf(element: HTMLElement, options: ExportPdfOptions = {}): Promise<void> {
  const { filename = 'export', pageFormat = defaultA4, paddingPx = 16, canvasScale = 2, orientation = 'portrait' } = options;
  const disabledStylesheets: Array<{ sheet: HTMLLinkElement; originalDisabled: boolean }> = [];

  try {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      const href = linkElement.href || '';
      if (
        href &&
        (href.includes('userway') || href.includes('accessibe') || (href.includes('cdn.') && !href.includes(window.location.hostname)))
      ) {
        disabledStylesheets.push({
          sheet: linkElement,
          originalDisabled: linkElement.disabled,
        });
        linkElement.disabled = true;
      }
    });
  } catch (error) {
    console.warn('Error disabling stylesheets:', error);
  }

  const cloned = element.cloneNode(true) as HTMLElement;

  const removeProblematicElements = (el: HTMLElement) => {
    el.querySelectorAll('link[rel="stylesheet"]').forEach((link) => link.remove());
    el.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
    el.querySelectorAll('script').forEach((script) => script.remove());
    el.querySelectorAll('[id*="userway"], [class*="userway"], [id*="accessibe"], [class*="accessibe"]').forEach((widget) => {
      widget.remove();
    });
  };

  removeProblematicElements(cloned);

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '-10000px';
  container.style.top = '0';
  container.style.padding = `${paddingPx}px`;
  container.style.background = getComputedStyle(document.body).backgroundColor || '#fff';
  container.appendChild(cloned);
  document.body.appendChild(container);

  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const elementWidth = cloned.scrollWidth;
    const elementHeight = cloned.scrollHeight;

    if (elementWidth === 0 || elementHeight === 0) {
      throw new Error('Element has zero dimensions. Cannot generate PDF from empty element.');
    }

    const filterNode = (node: Node): boolean => {
      if (node instanceof HTMLElement) {
        const id = node.id?.toLowerCase() || '';
        const className = node.className?.toString().toLowerCase() || '';
        const tagName = node.tagName?.toLowerCase() || '';

        if (
          id.includes('userway') ||
          className.includes('userway') ||
          id.includes('accessibe') ||
          className.includes('accessibe') ||
          id.includes('widget') ||
          className.includes('widget') ||
          tagName === 'iframe' ||
          tagName === 'script' ||
          tagName === 'noscript' ||
          tagName === 'link' ||
          (tagName === 'style' && (node as HTMLStyleElement).sheet && !(node as HTMLStyleElement).sheet?.href)
        ) {
          return false;
        }
      }
      return true;
    };

    let imgData: string = '';

    try {
      imgData = await toPng(cloned, {
        pixelRatio: canvasScale,
        width: elementWidth,
        height: elementHeight,
        backgroundColor: container.style.background,
        skipFonts: false,
        cacheBust: false,
        filter: filterNode,
        preferredFontFormat: 'woff2',
        includeQueryParams: false,
      });
    } catch (error) {
      console.warn('PDF Generation: Attempt 1 failed, trying without fonts:', error);
      try {
        imgData = await toPng(cloned, {
          pixelRatio: canvasScale,
          width: elementWidth,
          height: elementHeight,
          backgroundColor: container.style.background,
          skipFonts: true,
          cacheBust: false,
          filter: filterNode,
          includeQueryParams: false,
        });
      } catch (error2) {
        console.warn('PDF Generation: Attempt 2 failed, trying with minimal config:', error2);
        try {
          imgData = await toPng(cloned, {
            pixelRatio: Math.max(1, canvasScale - 1),
            backgroundColor: container.style.background,
            skipFonts: true,
            cacheBust: false,
            filter: filterNode,
          });
        } catch (error3) {
          console.warn('PDF Generation: Attempt 3 failed, trying absolute minimal:', error3);
          imgData = await toPng(cloned, {
            pixelRatio: 1,
            skipFonts: true,
            cacheBust: false,
          });
        }
      }
    }

    if (!imgData) {
      throw new Error('No PNG data was generated. All attempts failed.');
    }

    if (!imgData.startsWith('data:image/png;base64,')) {
      console.error('Invalid PNG data format. Got:', imgData.substring(0, 100));
      throw new Error(`Invalid PNG data format. Expected data:image/png;base64, but got: ${imgData.substring(0, 50)}...`);
    }

    const pdf = new jsPDF({
      orientation: orientation === 'portrait' ? 'p' : 'l',
      unit: 'pt',
      format: [pageFormat.width, pageFormat.height],
    });

    const pageWidth = pageFormat.width;
    const pageHeight = pageFormat.height;

    const imgWidth = pageWidth;
    const imgHeight = (elementHeight * imgWidth) / elementWidth;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage([pageWidth, pageHeight], orientation === 'portrait' ? 'p' : 'l');
      position = -(imgHeight - heightLeft);
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } finally {
    document.body.removeChild(container);

    disabledStylesheets.forEach(({ sheet, originalDisabled }) => {
      sheet.disabled = originalDisabled;
    });
  }
}

export async function exportBySelectorToPdf(selector: string, options?: ExportPdfOptions): Promise<void> {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    throw new Error(`Element not found for selector: ${selector}`);
  }
  return exportElementToPdf(el, options);
}

export async function exportReactComponentToPdf<T extends Record<string, any> = {}>(
  Component: React.ComponentType<T>,
  props: T,
  options: ExportPdfOptions = {},
): Promise<void> {
  const {
    filename = 'export',
    pageFormat = defaultA4,
    containerWidth = '210mm',
    containerHeight = '297mm',
    canvasScale = 2,
    orientation = 'portrait',
    wrapper,
  } = options;

  const disabledStylesheets: Array<{ sheet: HTMLLinkElement; originalDisabled: boolean }> = [];

  try {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      const linkElement = link as HTMLLinkElement;
      const href = linkElement.href || '';

      if (
        href &&
        (href.includes('userway') || href.includes('accessibe') || (href.includes('cdn.') && !href.includes(window.location.hostname)))
      ) {
        disabledStylesheets.push({
          sheet: linkElement,
          originalDisabled: linkElement.disabled,
        });
        linkElement.disabled = true;
      }
    });
  } catch (error) {
    console.warn('Error disabling stylesheets:', error);
  }

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '0';
  container.style.width = containerWidth;
  container.style.height = containerHeight;
  container.style.minWidth = containerWidth;
  container.style.minHeight = containerHeight;
  container.style.backgroundColor = 'white';
  container.style.boxSizing = 'border-box';
  container.style.overflow = 'visible';
  container.style.zIndex = '-9999';
  container.style.pointerEvents = 'none';

  try {
    const docDir = (document.documentElement.getAttribute('dir') || '') as string;
    if (docDir) container.setAttribute('dir', docDir);
  } catch {
    // Ignore errors when setting document direction
  }
  document.body.appendChild(container);

  try {
    const root = createRoot(container);
    await new Promise<void>((resolve) => {
      const node = React.createElement(Component, props);
      root.render(wrapper ? wrapper(node) : node);
      // Increase timeout to allow proper rendering
      setTimeout(resolve, 1000);
    });

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }
    } catch {
      // Ignore errors when waiting for fonts
    }

    // Remove problematic elements from the rendered component
    const removeProblematicElements = (el: HTMLElement) => {
      const externalLinks = el.querySelectorAll('link[rel="stylesheet"]');
      externalLinks.forEach((link) => {
        const href = (link as HTMLLinkElement).href;
        if (href && (href.includes('userway') || href.includes('cdn.') || href.includes('http'))) {
          link.remove();
        }
      });

      el.querySelectorAll('iframe').forEach((iframe) => iframe.remove());
      el.querySelectorAll('script').forEach((script) => script.remove());
      el.querySelectorAll('[id*="userway"], [class*="userway"], [id*="accessibe"], [class*="accessibe"]').forEach((widget) => {
        widget.remove();
      });
    };

    removeProblematicElements(container);

    // Check if container has valid dimensions
    if (container.scrollWidth === 0 || container.scrollHeight === 0) {
      console.error('Container has zero dimensions!', {
        scrollWidth: container.scrollWidth,
        scrollHeight: container.scrollHeight,
        containerStyle: container.style.cssText,
        childrenCount: container.children.length,
      });
      throw new Error('Container has zero dimensions. Component may not have rendered properly.');
    }

    console.log('PDF Generation (React): Container validated, proceeding with image generation...');

    const filterNode = (node: Node): boolean => {
      if (node instanceof HTMLElement) {
        const id = node.id?.toLowerCase() || '';
        const className = node.className?.toString().toLowerCase() || '';
        const tagName = node.tagName?.toLowerCase() || '';

        if (
          id.includes('userway') ||
          className.includes('userway') ||
          id.includes('accessibe') ||
          className.includes('accessibe') ||
          id.includes('widget') ||
          className.includes('widget') ||
          tagName === 'iframe' ||
          tagName === 'script' ||
          tagName === 'noscript' ||
          tagName === 'link' ||
          (tagName === 'style' && (node as HTMLStyleElement).sheet && !(node as HTMLStyleElement).sheet?.href)
        ) {
          return false;
        }
      }
      return true;
    };

    let imgData: string;

    try {
      console.log('PDF Generation (React): Attempt 1 - with fonts');
      imgData = await toPng(container, {
        pixelRatio: canvasScale,
        width: container.scrollWidth,
        height: container.scrollHeight,
        backgroundColor: 'white',
        skipFonts: false,
        cacheBust: false,
        filter: filterNode,
        preferredFontFormat: 'woff2',
        includeQueryParams: false,
      });
      console.log('PDF Generation (React): Attempt 1 succeeded');
    } catch (error) {
      console.warn('PDF Generation (React): Attempt 1 failed, trying without fonts:', error);
      try {
        console.log('PDF Generation (React): Attempt 2 - without fonts');
        imgData = await toPng(container, {
          pixelRatio: canvasScale,
          width: container.scrollWidth,
          height: container.scrollHeight,
          backgroundColor: 'white',
          skipFonts: true,
          cacheBust: false,
          filter: filterNode,
          includeQueryParams: false,
        });
        console.log('PDF Generation (React): Attempt 2 succeeded');
      } catch (error2) {
        console.warn('PDF Generation (React): Attempt 2 failed, trying with minimal config:', error2);
        try {
          console.log('PDF Generation (React): Attempt 3 - minimal config');
          imgData = await toPng(container, {
            pixelRatio: Math.max(1, canvasScale - 1),
            backgroundColor: 'white',
            skipFonts: true,
            cacheBust: false,
            filter: filterNode,
          });
          console.log('PDF Generation (React): Attempt 3 succeeded');
        } catch (error3) {
          console.warn('PDF Generation (React): Attempt 3 failed, trying absolute minimal:', error3);
          console.log('PDF Generation (React): Attempt 4 - absolute minimal (no filter)');
          imgData = await toPng(container, {
            pixelRatio: 1,
            skipFonts: true,
            cacheBust: false,
          });
          console.log('PDF Generation (React): Attempt 4 succeeded');
        }
      }
    }

    // Validate PNG data
    console.log('PDF Generation (React): PNG data check:', {
      hasData: !!imgData,
      dataLength: imgData?.length || 0,
      startsCorrectly: imgData?.startsWith('data:image/png;base64,'),
      preview: imgData?.substring(0, 100),
    });

    if (!imgData || !imgData.startsWith('data:image/png;base64,')) {
      throw new Error('Invalid PNG data generated. The image may be corrupted.');
    }

    // Check if PNG is not just an empty image
    if (imgData.length < 1000) {
      console.warn('PNG data seems too small, might be empty!', { length: imgData.length });
    }

    console.log('PDF Generation (React): Valid PNG data generated, creating PDF...');

    const pdf = new jsPDF({
      orientation: orientation === 'portrait' ? 'p' : 'l',
      unit: 'pt',
      format: [pageFormat.width, pageFormat.height],
    });

    const imgWidth = pageFormat.width;
    const imgHeight = pageFormat.height;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    pdf.save(`${filename}.pdf`);
    root.unmount();
  } finally {
    // Clean up: remove container
    document.body.removeChild(container);

    // Restore disabled stylesheets
    disabledStylesheets.forEach(({ sheet, originalDisabled }) => {
      sheet.disabled = originalDisabled;
    });
  }
}

export async function exportCurrentPageToPdf(options: ExportPdfOptions = {}): Promise<void> {
  return exportElementToPdf(document.body, {
    filename: 'page-export',
    ...options,
  });
}

export async function exportPageById(elementId: string, options?: ExportPdfOptions): Promise<void> {
  return exportBySelectorToPdf(`#${elementId}`, options);
}

export async function exportMultipleElementsToPdf(selectors: string[], options: ExportPdfOptions = {}): Promise<void> {
  const { filename = 'multi-export', pageFormat = defaultA4, canvasScale = 2, orientation = 'portrait' } = options;

  const pdf = new jsPDF({
    orientation: orientation === 'portrait' ? 'p' : 'l',
    unit: 'pt',
    format: [pageFormat.width, pageFormat.height],
  });

  for (let i = 0; i < selectors.length; i++) {
    const element = document.querySelector(selectors[i]) as HTMLElement | null;
    if (!element) {
      console.warn(`Element not found for selector: ${selectors[i]}`);
      continue;
    }

    const elementWidth = element.scrollWidth;
    const elementHeight = element.scrollHeight;

    const filterNode = (node: Node): boolean => {
      if (node instanceof HTMLElement) {
        const id = node.id?.toLowerCase() || '';
        const className = node.className?.toString().toLowerCase() || '';
        const tagName = node.tagName?.toLowerCase() || '';

        if (
          id.includes('userway') ||
          className.includes('userway') ||
          id.includes('accessibe') ||
          className.includes('accessibe') ||
          id.includes('widget') ||
          className.includes('widget') ||
          tagName === 'iframe' ||
          tagName === 'script' ||
          tagName === 'noscript' ||
          tagName === 'link' ||
          (tagName === 'style' && (node as HTMLStyleElement).sheet && !(node as HTMLStyleElement).sheet?.href)
        ) {
          return false;
        }
      }
      return true;
    };

    let imgData: string;

    try {
      console.log(`PDF Generation (Element ${i + 1}): Attempt 1 - with fonts`);
      imgData = await toPng(element, {
        pixelRatio: canvasScale,
        width: elementWidth,
        height: elementHeight,
        backgroundColor: 'white',
        skipFonts: false,
        cacheBust: false,
        filter: filterNode,
        preferredFontFormat: 'woff2',
        includeQueryParams: false,
      });
      console.log(`PDF Generation (Element ${i + 1}): Attempt 1 succeeded`);
    } catch (error) {
      console.warn(`PDF Generation (Element ${i + 1}): Attempt 1 failed, trying without fonts:`, error);
      try {
        console.log(`PDF Generation (Element ${i + 1}): Attempt 2 - without fonts`);
        imgData = await toPng(element, {
          pixelRatio: canvasScale,
          width: elementWidth,
          height: elementHeight,
          backgroundColor: 'white',
          skipFonts: true,
          cacheBust: false,
          filter: filterNode,
          includeQueryParams: false,
        });
        console.log(`PDF Generation (Element ${i + 1}): Attempt 2 succeeded`);
      } catch (error2) {
        console.warn(`PDF Generation (Element ${i + 1}): Attempt 2 failed, trying with minimal config:`, error2);
        try {
          imgData = await toPng(element, {
            pixelRatio: Math.max(1, canvasScale - 1),
            backgroundColor: 'white',
            skipFonts: true,
            cacheBust: false,
            filter: filterNode,
          });
          console.log(`PDF Generation (Element ${i + 1}): Attempt 3 succeeded`);
        } catch (error3) {
          console.warn(`PDF Generation (Element ${i + 1}): Attempt 3 failed, trying absolute minimal:`, error3);
          console.log(`PDF Generation (Element ${i + 1}): Attempt 4 - absolute minimal (no filter)`);
          imgData = await toPng(element, {
            pixelRatio: 1,
            skipFonts: true,
            cacheBust: false,
          });
        }
      }
    }
    if (!imgData || !imgData.startsWith('data:image/png;base64,')) {
      throw new Error(`Invalid PNG data generated for element ${i + 1}. The image may be corrupted.`);
    }
    const imgWidth = pageFormat.width;
    const imgHeight = (elementHeight * imgWidth) / elementWidth;

    if (i > 0) {
      pdf.addPage([pageFormat.width, pageFormat.height], orientation === 'portrait' ? 'p' : 'l');
    }

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
  }

  pdf.save(`${filename}.pdf`);
}
