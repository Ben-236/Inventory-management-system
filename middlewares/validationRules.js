
const registerRules = [
  {
    field: 'firstname',
    rules: 'required',
  },
  {
    field: 'lastname',
    rules: 'required',
  },
  {
    field: 'email',
    rules: 'required|email|unique',
    unique: 'User',
    messages: {
      required: 'Email address is required.',
      email: 'A valid email address is required.',
      unique: 'Email address already exists.',
    },
  },
  {
    field: 'password',
    rules: 'required|minlen',
    minlen: 8,
  },
  {
    field: 'role',
    rules: 'belongsto',
    belongsto: [
      'admin',
      'super admin',
      'customer',
      'freelancer',
     
    ],
  },
];

const resetPasswordRules = [
  {
    field: 'email',
    rules: 'required',
  },
];

const changePasswordRules = [
  {
    field: 'password',
    rules: 'required|minlen',
    minlen: 8,
  },
];

const loginRules = [
  {
    field: 'email',
    rules: 'required',
    messages: {
      required: 'Email address or Merchant ID is required.',
    },
  },
  {
    field: 'password',
    rules: 'required',
  },
];

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


export { itemRules, categoryRules, loginRules, registerRules, resetPasswordRules, changePasswordRules };
