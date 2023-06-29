import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients: ingredientInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }



      setResult(data.result);
      setIngredientInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    // <div >
    <div style={{backgroundColor: '#d7f1e5', margin:0}}>
      <Head>
        <title>Mai Meal Beta</title>
        {/* <link rel="icon" href="/dog.png" /> */}
      </Head>

      <main className={styles.main}>
        {/* <img src="/dog.png" className={styles.icon} /> */}
        <h3>Input ingredients you have to generate a recipe</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="ingredients"
            placeholder="i.e rice, ground beef, white onion"
            value={ingredientInput}
            onChange={(e) => setIngredientInput(e.target.value)}
          />
          <input type="submit" value="Generate recipe" />
        </form>
        <div className={styles.result}>
          <pre>
          {result}
          </pre>
          
          </div>
      </main>
    </div>


    // </div>
  );
}
