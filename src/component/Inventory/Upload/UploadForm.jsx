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
      stock_quantity: 0,
      cost_price: null,
      selling_price: null,
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
                        className="py-2 items-center grid grid-cols-[45px_1fr_280px_120px_120px_120px_120px_120px_120px_65px]"
                      >
                        {/* S/N */}
                        <div className="px-[10px] text-center py-1 border border-[#eaeaea]">
                          {i + 1}
                        </div>
                        {/* Name Field */}
                        <form.Field name={`item[${i}].name`}>
                          {(subField) => {
                            return (
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    required
                                    className="w-full focus:outline-none"
                                    value={subField.state.value}
                                    placeholder="Type product name..."
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    className="w-full focus:outline-none"
                                    placeholder="Short product description"
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

                        {/* Stock Quantity Field */}
                        <form.Field key={i} name={`item[${i}].stock_quantity`}>
                          {(subField) => {
                            return (
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    required
                                    type="number"
                                    placeholder="0"
                                    className="w-full focus:outline-none"
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    required
                                    type="number"
                                    className="w-full focus:outline-none"
                                    placeholder="0.00"
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    type="number"
                                    required
                                    placeholder="0.00"
                                    className="w-full focus:outline-none"
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    className="w-full focus:outline-none"
                                    placeholder="Product category"
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    required
                                    className="w-full focus:outline-none"
                                    placeholder="Supplier name"
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
                              <div className="px-[10px] py-1 border border-[#eaeaea]">
                                <label className="">
                                  <input
                                    className="w-full focus:outline-none"
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
                          className="text-red-500 text-[30px] mx-auto cursor-pointer hover:text-red-700 transition ease-in-out"
                          onClick={() => field.removeValue(i)}
                        />
                      </div>
                    );
                  })}

                  <div className="flex items-center w-fit ml-auto m-5 gap-4">
                    <button
                      className="bg-blue-500 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-blue-700"
                      onClick={() =>
                        field.pushValue({
                          name: "",
                          description: "",
                          stock_quantity: null,
                          cost_price: null,
                          selling_price: null,
                          category: "",
                          supplier: "",
                          image: "",
                        })
                      }
                      type="button"
                    >
                      Add item
                    </button>

                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <button
                          type="submit"
                          className="bg-green-500 cursor-pointer text-white py-2 px-4 rounded-[8px] hover:bg-green-700"
                          disabled={!canSubmit}
                        >
                          {isSubmitting ? "..." : "Submit"}
                        </button>
                      )}
                    />
                  </div>
                </div>
              );
            }}
          </form.Field>
         
        </form>
      </div>
    );
}