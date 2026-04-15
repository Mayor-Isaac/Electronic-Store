import { TrashIcon } from '@phosphor-icons/react';
import { useForm } from '@tanstack/react-form'

function FieldInfo({ field }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const defaultItem = {
  item: [
    {
      name: "",
      description: "",
      cost_price: 0,
      selling_price: 0,
      category: "",
      supplier: "",
      image: "",
    },
  ],
};

export default function UploadForm() {

   const form = useForm({
     defaultValues: defaultItem,
     onSubmit({ value }) {
       alert(JSON.stringify(value));
     },
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
          <form.Field name="item" mode="array">
            {(field) => {
              const item = field.state.value ?? [];

              return (
                <div className="">
                  {item.map((_, i) => {
                    return (
                      <div
                        key={i}
                        className="border-b border-[#eaeaea] items-center grid grid-cols-[45px_1fr_280px_120px_120px_120px_120px_120px_60px]"
                      >
                        <div className="px-[10px] py-1 border">{i + 1}</div>
                        {/* Name Field */}
                        <form.Field name={`item[${i}].name`}>
                          {(subField) => {
                            return (
                              <div className="px-[10px] py-1 border">
                                <label className="">
                                  <input
                                    className='w-full'
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Description Field */}
                        <form.Field key={i} name={`item[${i}].description`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Cost Price Field */}
                        <form.Field key={i} name={`item[${i}].cost_price`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Selling Price Field */}
                        <form.Field key={i} name={`item[${i}].selling_price`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Category Field */}
                        <form.Field key={i} name={`item[${i}].category`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Supplier Field */}
                        <form.Field key={i} name={`item[${i}].supplier`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        {/* Image Field */}
                        <form.Field key={i} name={`item[${i}].image`}>
                          {(subField) => {
                            return (
                              <div className="border">
                                <label className="">
                                  <input
                                    className="w-full"
                                    value={subField.state.value}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                  />
                                  <FieldInfo field={subField} />
                                </label>
                              </div>
                            );
                          }}
                        </form.Field>

                        <TrashIcon
                          className="text-red-500 text-[30px] cursor-pointer hover:text-red-700 transition ease-in-out"
                          onClick={() => field.removeValue(i)}
                        />
                      </div>
                    );
                  })}
                  <button
                    onClick={() => field.pushValue({ name: "", description: "", cost_price: 0, selling_price: 0, category: "", supplier: "", image: "" })}
                    type="button"
                  >
                    Add item
                  </button>
                </div>
              );
            }}
          </form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? "..." : "Submit"}
              </button>
            )}
          />
        </form>
      </div>
    );
}