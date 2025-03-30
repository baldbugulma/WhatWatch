import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, inject, input, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'ww-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ww-input.component.html',
  styleUrl: './ww-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Регистрация компонента в Angular формах
      multi: true, // Разрешает регистрацию нескольких провайдеров
      useExisting: forwardRef(() => WwInputComponent) // Указывает текущий компонент для NG_VALUE_ACCESSOR
    }
  ]
})
export class WwInputComponent implements ControlValueAccessor{
  cdr = inject(ChangeDetectorRef)
  // Свойство, определяющее тип ввода (text или password), по умолчанию 'text'
  type = input<'text' | 'password'>('text')
  icon = input<string>('')
  // Свойство для текста-заполнителя (placeholder), по умолчанию пустая строка
  placeholder = input<string>('')

  // Сигнал, указывающий, заблокирован ли компонент, по умолчанию false (компонент активен)
  disabled = signal<boolean>(false)

  onChange: (value: string | null) => void = () => {
    // Колбэк-функция, вызываемая при изменении значения
  }

  onTouched: () => void = () => {
    // Колбэк-функция, вызываемая при взаимодействии с компонентом
  }
  // Текущее значение компонента, по умолчанию null
  value: string | null = null

  /**
   * Метод, вызываемый Angular для передачи значения в компонент.
   * @param val - Новое значение для установки.
   */
  writeValue(val: string | null) {
    this.value = val // Логирование значения в консоль (для отладки).
    this.cdr.detectChanges()
  }

  /**
   * Метод для регистрации функции обратного вызова при изменении значения.
   * @param fn - Функция, вызываемая при изменении значения.
   */
  registerOnChange(fn: (value: string | null) => void): void {
    this.onChange = fn
  }

  /**
   * Метод для регистрации функции обратного вызова при взаимодействии с компонентом.
   * @param fn - Функция, вызываемая при взаимодействии с компонентом.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }

  /**
   * Метод, вызываемый Angular для блокировки или разблокировки компонента.
   * @param isDisabled - Если true, компонент становится заблокированным.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled) // Устанавливаем значение сигнала disabled.
  }

  /**
   * Метод, вызываемый при изменении значения пользователем.
   * @param val - Новое значение, введенное пользователем.
   */
  onModelChange(val: string | null): void {
    this.onChange(val) // Вызываем функцию onChange с новым значением.
    this.cdr.detectChanges()
  }
}
