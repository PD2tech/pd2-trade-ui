export class ValidationRenderer {
    render(instruction) {
        for (let { result, elements } of instruction.unrender) {
            for (let element of elements) {
                this.remove(element, result);
            }
        }

        for (let { result, elements } of instruction.render) {
            for (let element of elements) {
                this.add(element, result);
            }
        }
    }

    add(element, result) {
        if (result.valid) {
            return;
        }

        element.classList.add('is-invalid');

        const customElement = element.closest('.mdc-text-field');
        if (!customElement) {
            return;
        }

        const message = document.createElement('div');
        console.log(message);
        message.className = 'invalid-feedback mb-3';
        message.textContent = result.message;
        message.id = `validation-message-${result.id}`;
        customElement.after(message);
        customElement.classList.remove('mb-3')
    }

    remove(element, result) {
        if (result.valid) {
            return;
        }

        const customElement = element.closest('.mdc-text-field');
        if (!customElement) {
            return;
        }

        const message = document.querySelector(`#validation-message-${result.id}`);
        if (!message) {
            return;
        }

        message.remove();
        customElement.classList.add('mb-3')
    }
}
