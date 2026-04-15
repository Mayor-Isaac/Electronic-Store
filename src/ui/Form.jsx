import { useForm } from "@tanstack/react-form";

function defaultSubmit(value) {
  alert(JSON.stringify(value));
}

function defaultRowRenderer({ index, nameField }) {
  return (
    <label>
      <div>Name for person {index}</div>
      <input
        value={nameField.state.value ?? ""}
        onChange={(e) => nameField.handleChange(e.target.value)}
      />
    </label>
  );
}

export default function Form({
  initialPeople = [],
  onSubmit = defaultSubmit,
  addButtonText = "Add person",
  submitButtonText = "Submit",
  renderPersonRow = defaultRowRenderer,
}) {
  const form = useForm({
    defaultValues: { people: initialPeople },
    onSubmit: ({ value }) => onSubmit(value),
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="people" mode="array">
          {(field) => {
            const people = field.state.value ?? [];

            return (
              <div>
                {people.map((_, i) => (
                  <form.Field key={i} name={`people[${i}].name`}>
                    {(nameField) => (
                      <div>
                        {renderPersonRow({
                          index: i,
                          nameField,
                          pushPerson: (person) => field.pushValue(person),
                          removePerson: () => field.removeValue(i),
                        })}
                      </div>
                    )}
                  </form.Field>
                ))}

                <button
                  type="button"
                  onClick={() => field.pushValue({ name: "", age: 0 })}
                >
                  {addButtonText}
                </button>
              </div>
            );
          }}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : submitButtonText}
            </button>
          )}
        />
      </form>
    </div>
  );
}
