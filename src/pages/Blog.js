import React, { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';
import axios from 'axios';
import Article from '../components/Article';

const Blog = () => {
    const [blogData, setblogData] = useState([])
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(false)

    const getData = () => {
        axios.get("http://192.168.1.16:3004/articles").then((res) => setblogData(res.data))
    }

    useEffect(() => getData(), [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (content.length < 140) {
            setError(true)
        } else {
            await axios.post("http://192.168.1.16:3004/articles", {
                author,
                content,
                date: Date.now(),
            })
            setError(false)
            setAuthor("")
            setContent("")
            getData()
        }
    }

    const handleChange = (e) => {
        setAuthor(e.target.value)
    }

    return (
        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1>Blog</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nom" onChange={handleChange} value={author} />
                <textarea style={{ border: error ? "1px solid red" : "1px solid #61dafb" }} placeholder='Message' onChange={(e) => setContent(e.target.value)} value={content}></textarea>
                {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
                <input type="submit" value="Envoyer" />
            </form>
            <ul>
                {blogData
                    .sort((a, b) => b.date - a.date)
                    .map((article) => (
                        <Article key={article.id} article={article} />
                    ))}
            </ul>
        </div>
    );
};

export default Blog;