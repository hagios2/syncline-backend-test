import { object, string, date, array } from 'yup'
import { parse } from "date-fns/parse"

const blogRequestSchema = object({
  body: object({
    title: string().required('Title is required'),
    content: string().required('Content is required'),
    category: string().required('Category is required'),
    publicationDate: date().transform(function (value, originalValue) {
        if (this.isType(value)) {
          return value;
        }
        const result = parse(originalValue, "dd.MM.yyyy", new Date());
        return result;
      })
      .typeError("Please enter a valid date")
      .min("1969-11-13", "Date is too early"),
    tags: array().of(string())
  })
})

const categoryRequestSchema = object({
    body: object({
      name: string().required('Name is required'),
    })
  })

export { blogRequestSchema, categoryRequestSchema }