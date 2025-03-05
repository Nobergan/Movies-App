import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

/**
 * Temporary hack due to Jest error with externally imported type or interface when using custom decorator on property
 * Check if it can be removed (fixed) after next dep upgrades
 */
type ValidationErrorsPrivate = ValidationErrors;

@Component({
  selector: 'pu-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
  /**
   * Control errors
   */
  errors = input<ValidationErrorsPrivate | null>();
  /**
   * Errors dictionary. Dictionary which contain error key as a key of record, and error text as a value
   * Adds ability to not extend template of ValidationMessageComponent each time when new errors for different components added
   */
  errorDictionary = input<Record<string, string>>();

  /**
   * Errors params. They are needed for translations when params needed.
   */
  errorParams = input<Record<string, Record<string, string>>>();

  /**
   * Should only one error be displayed even if we have few errors
   */
  isSingleError = input<boolean>(false);

  /**
   * Convert ValidationErrors object to list, that will be used with errorDictionary
   * @private
   */
  errorsList = computed(() => {
    const errors = this.errors();
    const errorsList: string[] = [];

    if (errors) {
      Object.entries(errors).forEach(([key, value]) => {
        if (value) {
          errorsList.push(key);
        }
      });
    }

    return errorsList;
  });
}
