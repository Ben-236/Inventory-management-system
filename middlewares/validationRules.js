const itemRules = [
  {
    field: 'name',
    rules: 'required',
    messages: {
      required: 'Name is required.',
    },
  },
  {
    field: 'price',
    rules: 'required',
  },
  {
    field: 'quantity',
    rules: 'required',
  },
  {
    field: 'category',
    rules: 'required',
  },
  {
    field: 'image_url',
    rules: 'required',
  }
];

const categoryRules = [
  {
    field: 'title',
    rules: 'required',
    messages: {
      required: 'Category is required.',
    },
  }
];


export { itemRules,categoryRules };
