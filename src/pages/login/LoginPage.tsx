import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Usiamo la funzione che abbiamo scritto nel Context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita il refresh della pagina
    const success = await login(username, password);
    
    if (success) {
      navigate("/home");
    } else {
      alert("Errore login");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginCard}>
        <h2 className={styles.title}>Login</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            placeholder="Username"
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

          <button type="submit" className={styles.loginBtn}>
            Entra
          </button>
        </form>
        
        <p className={styles.footer}>
          Non hai un account?{" "}
          <span 
          className={styles.link} 
          onClick={() => navigate("/register")}
          style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
          >
          Registrati qui
          </span>
        </p>
      </div>
    </div>
  );
};