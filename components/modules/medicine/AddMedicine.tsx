'use client'

import { createMedicine } from '@/actions/medicine.action'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Category, User } from '@/types'
import { useForm } from '@tanstack/react-form'
import React, { useState } from 'react'
import { toast } from 'sonner'
import z from 'zod'

/* ================= Schema ================= */

const medicineSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  price: z.number().min(1, 'Price must be at least 1'),
  stock: z.number().min(1, 'Stock must be at least 1'),
  manufacturer: z.string().min(2, 'Manufacturer must be at least 2 characters'),
  imageUrl: z.string().url('Invalid image URL'),
  categoryId: z.string().min(1, 'Category is required'),
  sellerId: z.string(),
})

/* ================= Component ================= */

const AddMedicine = ({
  categories,
  user,
}: {
  categories: Category[]
  user: User
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      stock: 0,
      manufacturer: '',
      imageUrl: '',
      categoryId: '',
      sellerId: user.id,
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading('Creating Medicine...')

      try {
        const { data, error } = await createMedicine(value)

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        }

        toast.success(data?.message || 'Medicine created', { id: toastId })
        setIsOpen(false)
        form.reset()
      } catch {
        toast.error('Something went wrong', { id: toastId })
      }
    },
  })
console.log(form)
  return (
    <>
      {/* Open Button */}
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Add Medicine
      </Button>

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[720px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Add New Medicine</DialogTitle>
          </DialogHeader>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
            className="grid grid-cols-1 gap-4 py-4 md:grid-cols-2"
          >
            {/* Section Title */}
            <div className="md:col-span-2 text-sm font-semibold text-muted-foreground">
              Basic Information
            </div>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Category</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>

                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Name</FieldLabel>
                    <Input
                      value={field.state.value}
                      placeholder="e.g. Napa 500mg"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Description */}
            <div className="md:col-span-2">
              <form.Field name="description">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Description</FieldLabel>
                      <Textarea
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </div>

            {/* Price */}
            <form.Field name="price">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Price</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value ?? 0}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Stock</FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value ?? 0}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Manufacturer</FieldLabel>
                    <Input
                      value={field.state.value}
                      placeholder="e.g. Beximco"
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Image URL + Preview */}
            <form.Field name="imageUrl">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Image URL</FieldLabel>
                    <Input
                      value={field.state.value}
                      placeholder="https://images.unsplash.com/photo-..."
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />

                    {field.state.value.startsWith('http') && (
                      <div className="mt-2 h-20 w-20 overflow-hidden rounded-md border">
                        <img
                          src={field.state.value}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            </form.Field>

            {/* Submit */}
            <DialogFooter className="md:col-span-2">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={form.state.isSubmitting}
              >
                {form.state.isSubmitting ? 'Adding...' : 'Add Medicine'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddMedicine