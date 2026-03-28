import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Le password non coincidono!");
      return;
    }

    const success = await register(username, password);
    
    if (success) {
      alert("Registrazione completata! Ora puoi accedere.");
      navigate("/login");
    } else {
      alert("Errore durante la registrazione. Forse l'utente esiste già?");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.registerCard}>
        <h2 className={styles.title}>Crea Account</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Scegli uno Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Conferma Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.registerBtn}>
            Registrati
          </button>
        </form>
        
        <p className={styles.footer}>
          Hai già un account? <span onClick={() => navigate('/login')} className={styles.link}>Accedi</span>
        </p>
      </div>
    </div>
  );
};