import { useRef, useState, type FormEvent } from "react";
import styles from "../css/Register.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function SignupForm() {
  const { register } = useAuth();
  // data
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
  // errors
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const getDefaultImageFile = async (): Promise<File> => {
      return new File([" "], "default-user.png", { type: "image/png" });
    };

    // try {
    //   const response = await axios.post(
    //     "http://127.0.0.1:8001/api/register",
    //     {
    //       name: nameRef.current?.value,
    //       email: emailRef.current?.value,
    //       password: passwordRef.current?.value,
    //       img_profile_url: profileImageRef.current?.files?.[0],
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );

    // //  get Token from response
    // const token = response.data["Register Successful"]?.token;
    // // store token in local storage
    // localStorage.setItem("auth_token", token);
    // console.log("token:", token);
    // // get Token from local storage
    // console.log("token: ", localStorage.getItem("auth_token"));

    const image =
      profileImageRef.current?.files?.[0] || (await getDefaultImageFile());

    try {
      await register({
        name: nameRef.current!.value,
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        img_profile_url: image,
      });

      console.log("Registered:"); // response will be user
      navigate("/home");
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response && error.response.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Failed to Register User");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h2 className={styles.formTitle}>Register</h2>

      <div className={styles.formGroup}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          ref={nameRef}
          required
          className={styles.formInput}
        />
        {errors.name && <p className={styles.errorText}>{errors.name[0]}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          required
          className={styles.formInput}
        />
        {errors.email && <p className={styles.errorText}>{errors.email[0]}</p>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          ref={passwordRef}
          required
          className={styles.formInput}
        />
        {errors.password && (
          <p className={styles.errorText}>{errors.password[0]}</p>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="profileImage">profile Image</label>
        <input
          type="file"
          id="profileImage"
          ref={profileImageRef}
          accept="image/*"
          className={styles.formInput}
        />
        {errors.img_profile_url && (
          <p className={styles.errorText}>{errors.img_profile_url[0]}</p>
        )}
      </div>

      <button type="submit" className={styles.submitButton}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
