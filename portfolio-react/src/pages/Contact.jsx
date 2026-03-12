import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useState } from "react";

const Header = styled.header`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 65ch;
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
  max-width: 520px;
`;

const Field = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(2, 6, 23, 0.6);
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Textarea = styled.textarea`
  padding: 0.7rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(2, 6, 23, 0.6);
  color: ${({ theme }) => theme.colors.text};
  resize: vertical;
  min-height: 120px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Error = styled.span`
  color: #ef4444;
  font-size: 0.85rem;
`;

const Button = styled.button`
  margin-top: 0.5rem;
  padding: 0.7rem 1rem;
  border-radius: 14px;
  font-weight: 700;
  border: 1px solid rgba(148, 163, 184, 0.22);
  background: rgba(37, 99, 235, 0.2);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SuccessBox = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 14px;
  border: 1px solid rgba(34, 197, 94, 0.4);
  background: rgba(34, 197, 94, 0.12);
`;

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const [serverError, setServerError] = useState(null);

  // El envío es simulado (mock). En producción se conectaría a un servicio de email como EmailJS o un endpoint propio.
  const onSubmit = async (data) => {
    setServerError(null);
    try {
      await new Promise((res) => setTimeout(res, 900));
      reset();
    } catch (e) {
      setServerError("No se pudo enviar el mensaje. Inténtalo más tarde.");
    }
  };

  return (
    <>
      <Header>
        <Title>Contacto</Title>
        <Subtitle>
          ¿Tienes una propuesta o quieres hablar de un proyecto? Escríbeme y
          te respondo lo antes posible.
        </Subtitle>
      </Header>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Field>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            type="text"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
            })}
          />
          {errors.name && <Error>{errors.name.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "El email es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email no válido",
              },
            })}
          />
          {errors.email && <Error>{errors.email.message}</Error>}
        </Field>

        <Field>
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            {...register("message", {
              required: "El mensaje es obligatorio",
              minLength: { value: 10, message: "Mínimo 10 caracteres" },
            })}
          />
          {errors.message && <Error>{errors.message.message}</Error>}
        </Field>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar mensaje"}
        </Button>

        {isSubmitSuccessful && (
          <SuccessBox>¡Mensaje enviado correctamente!</SuccessBox>
        )}

        {serverError && <Error>{serverError}</Error>}
      </Form>
    </>
  );
};

export default Contact;