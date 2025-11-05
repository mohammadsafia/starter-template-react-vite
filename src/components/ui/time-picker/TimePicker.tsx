import { useEffect, useMemo, useState } from 'react';
import { useDebounce, useTime } from '@hooks/shared';
import { Button, Popover, ScrollSelector } from '@components/ui';
import { cn } from '@utils';
import { Check, Clock4Icon, XIcon } from 'lucide-react';
import { Conditional } from '@components/shared';

export type TimePickerProps = {
  name: string;
  value?: string;
  onChange: (value?: string) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  clearButton?: boolean;
  use24hFormat?: boolean;
  min?: string;
  max?: string;
  step?: number;
  startAt?: string;
  error?: boolean;
};

export default function TimePicker({
  name,
  className,
  disabled,
  placeholder,
  clearButton = true,
  min = '00:00',
  startAt = '08:00 AM',
  max = '23:45',
  step = 15,
  use24hFormat = false,
  value,
  onChange,
  error = false,
}: TimePickerProps) {
  const { getTimeOptions, parseTimeString } = useTime();
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState('');

  const [minHour] = useMemo(() => parseTimeString(min), [min]);
  const [maxHour] = useMemo(() => parseTimeString(max), [max]);

  const timeOptions = useMemo(() => getTimeOptions(min, max, step, !use24hFormat), [min, max, step, use24hFormat]);

  const [valHour, valMinute, valAmPm] = useMemo(() => parseTimeString(tempValue), [tempValue]);

  const hourOptions = useMemo(
    () =>
      timeOptions
        .filter((option) => option.toLowerCase().includes((valAmPm ?? 'am').toLowerCase()))
        .reduce(
          (prev, time) => {
            const hour = time.split(':')[0];
            if (prev.find((option) => option.value === parseInt(hour))) return prev;
            return [
              ...prev,
              {
                label: hour,
                value: parseInt(hour),
                hide: false,
              },
            ];
          },
          [] as { label: string; value: number }[],
        ),
    [timeOptions, valAmPm],
  );

  const minuteOptions = useMemo(
    () =>
      timeOptions
        .filter(
          (option) =>
            option.toLowerCase().includes((valAmPm ?? 'am').toLowerCase()) &&
            option.includes(`${(valHour - (valAmPm === 'PM' && valHour > 12 ? 12 : 0)).toString().padStart(2, '0')}:`),
        )
        .reduce(
          (prev, time) =>
            prev.find((option) => option.value === parseInt(time.split(':')[1]))
              ? prev
              : [
                  ...prev,
                  {
                    label: time.split(':')[1].split(' ')[0],
                    value: parseInt(time.split(':')[1].split(' ')[0]),
                    hide: false,
                  },
                ],
          [] as { label: string; value: number }[],
        ),
    [timeOptions, valHour, valAmPm],
  );

  const ampmOptions = useMemo(
    () => [
      { label: 'AM', value: 'AM', hide: minHour >= 12 },
      { label: 'PM', value: 'PM', hide: maxHour < 12 },
    ],
    [minHour, maxHour],
  );

  useEffect(() => {
    if (!isOpen) setTempValue('');
    else setTempValue(value || startAt || min);
  }, [isOpen, value, startAt, min]);

  const display = useDebounce(tempValue || value, 200);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen} modal>
      <Popover.Trigger id={name} asChild>
        <Button
          className={cn(
            'aria-expanded:bg-accent/50 flex w-full justify-between',
            {
              'border-destructive hover:ring-destructive focus-within:ring-destructive border bg-transparent ps-8 focus-within:ring hover:bg-transparent hover:ring':
                error,
            },

            className,
          )}
          variant="outline"
          disabled={disabled}
        >
          <div className="flex grow items-center gap-2">
            <Clock4Icon size={20} />
            <Conditional>
              <Conditional.If condition={!!display}>{display}</Conditional.If>
              <Conditional.Else>
                <span>{placeholder}</span>
              </Conditional.Else>
            </Conditional>
          </div>
          <Conditional.If condition={!!value && clearButton}>
            <XIcon
              className="hover:text-destructive"
              size={16}
              onClick={(e) => {
                e.stopPropagation();
                onChange(undefined);
              }}
            />
          </Conditional.If>
        </Button>
      </Popover.Trigger>
      <Popover.Content className="w-fit" side="bottom" align="start">
        <div className="flex gap-2">
          {/* Hour */}
          <ScrollSelector
            options={hourOptions}
            value={parseInt(tempValue.split(':')[0])}
            onSelect={(val) =>
              isOpen &&
              setTempValue(
                `${val.toString().padStart(2, '0')}:${valMinute.toString().padStart(2, '0')}${use24hFormat ? '' : ' ' + (valAmPm ?? 'AM')}`,
              )
            }
          />
          <ScrollSelector
            options={minuteOptions}
            value={valMinute}
            onSelect={(val) =>
              isOpen &&
              setTempValue(`${tempValue.split(':')[0]}:${val.toString().padStart(2, '0')}${use24hFormat ? '' : ' ' + (valAmPm ?? 'AM')}`)
            }
          />
          <Conditional.If condition={!use24hFormat}>
            <ScrollSelector
              options={ampmOptions}
              value={valAmPm}
              onSelect={(val) => isOpen && setTempValue(`${tempValue.split(':')[0]}:${valMinute.toString().padStart(2, '0')} ${val}`)}
            />
          </Conditional.If>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            className="h-auto px-2 py-1"
            onClick={() => {
              onChange(tempValue);
              setIsOpen(false);
            }}
          >
            <Check size={20} className="text-primary" />
          </Button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
