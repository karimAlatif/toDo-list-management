export const checkAddressField = () => {
  return {
    validate: {
      //  check length after replacing start space and replace inner spaces with one space
      required: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length !== 0 || 'Address field is required.',
    },
  };
};
