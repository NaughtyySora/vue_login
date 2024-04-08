const REGEXPS = {
  email: /^\w+([\.-_]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/,
};

export const validators = {
  email: (value?: string) => !!value && new RegExp(REGEXPS.email).test(value),
  password: (value?: string) => !!value && value.length >= 8,
  name: (value?: string) => !!value && value.length >= 1,
};


interface ValidateFormMeta {
  data: FormData,
  options: {
    key: string,
    validator?: keyof typeof validators;
  }[]
}

export const bulkValidateForm = (meta: ValidateFormMeta) => {
  let valid = true;
  
  for (const {key, validator = key} of meta.options) {
    const fn = validators[validator as keyof typeof validators];
    const isValid = fn(meta.data.get(key) as string);

    if(!isValid) {
      valid = isValid;
      break;
    }
  }

  return valid;
};
