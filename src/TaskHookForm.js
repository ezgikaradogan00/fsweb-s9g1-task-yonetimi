import React from 'react'
import { useForm } from 'react-hook-form'
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid";



export default function TaskHookForm({ kisiler, submitFn }) {
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { title: "", description: "", people: [], },
  });

  const formSubmit = (formData) =>{console.log("formSubmit>formData: " ,formData )

  let taskId = nanoid(5);
  submitFn({
    ...formData,
    id: 325,
    status: "yapılacak",
  });
};


  return (
    <form onSubmit={handleSubmit(formSubmit)}>
      <div className="form-line">
      <label className="input-label" htmlFor="title">
          Başlık
      </label>
        <input
          className="input-text"
          type='text'
          name='title'
          {...register('title', {
            required:"Task başlığı yazmalısınız",
            minLength: {
              value:3,
              message:"Task başlığı en az 3 karakter olmalı"
            }
          
          })}
        
        />

       {errors.title && <p>{errors.title.message}</p>}
      </div>
      <br />

      <div className="form-line">
      <label className="input-label" htmlFor="description">
          Açıklama
      </label>
        <input
          className="input-textarea"
          type='text'
          name='description'
          {...register('description', {
            required:"Task açıklaması yazmalısınız",
            minLength: {
              value:10,
              message:"Task açıklaması en az 10 karakter olmalı"
            }
          
          })}
        
        />
      

      {errors.description && <p>{errors.description.message}</p>}
      <br />
      </div>

      
      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                name="people"
                value={p}
                {...register("people", {
                  validate: {
                    moreThanOne: (p) =>
                      p.length >= 1 || "Lütfen en az bir kişi seçin",
                    maxThree: (p) =>
                      p.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
                
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && <p>{errors.people.message}</p>}
      </div>

      
      <br />

      <div className="form-line">
        <button
          className="submit-button"
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>

    </form>
  )
  
};







