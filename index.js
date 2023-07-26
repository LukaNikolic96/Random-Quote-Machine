function App () {
    const[quotes, setQuotes]= React.useState([]);
    const[randomQuotes, setRandomQuotes]= React.useState(null);
    const[color, setRandomColors]= React.useState("#111");

    React.useEffect(() => {
        async function fetchData() {
          const response = await fetch("https://type.fit/api/quotes");
          const data = await response.json();
      
          setQuotes(data);
          let randomIndex = Math.floor(Math.random() * data.length);
          setRandomQuotes(data[randomIndex]);
        }
        fetchData();
      }, []);
    const getNewQuote = () => {

        const colors = [
            "#16a085",
            "#27ae60",
            "#2c3e50",
            "#f39c12",
            "#e74c3c",
            "#9b59b6",
            "#FB6964",
            "#342224",
            "#472E32",
            "#BDBB99",
            "#77B1A9",
            "#73A857"
          ];
          
        let randomIndex = Math.floor(Math.random() * quotes.length);
            setRandomQuotes(quotes[randomIndex]);
            let randomColorIndex = Math.floor(Math.random() * colors.length);
            setRandomColors(colors[randomColorIndex]);
    }
    const shareOnTwitter = () => {
        const tweetText = encodeURIComponent(`"${randomQuotes.text}" - ${randomQuotes.author}`)
        const tweetURL = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${tweetText}`;
        window.open(tweetURL);
    }
    

    return (
        <div style={{ background: color, minHeight: "100vh" }}>
          <div className="container" id="quote-box">
            <div className="jumbotron">
              <div className="card">
                <div className="card-header text-center" id="text">
                  Inspirational Quotes
                </div>
                <div className="card-body" id="author">
                {randomQuotes ? (
              <>
                {/* Display author's name and handle 'No Author' */}
                <h5 className="card-title">- {randomQuotes.author && randomQuotes.author !== "type.fit" ? randomQuotes.author.split(",")[0] : "No Author"}</h5>
                <p className="card-text">&quot;{randomQuotes.text}&quot;</p>
              </>
            ): (
                    <h2>Loading</h2>
                  )}
                  <div className="row">
                    <button className="btn btn-primary ml-3" onClick={getNewQuote} id="new-quote">New Quote</button>
                    <a href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${tweetText}" className="btn btn-warning" id="tweet-quote"
                      target="_blank" onClick={shareOnTwitter}>
                      <i className="ri-twitter-fill"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}
ReactDOM.render(<App/>, document.getElementById("app"))