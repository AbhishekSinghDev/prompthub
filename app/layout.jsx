import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const metadata = {
  title: "PromptHub",
  description: "Share and Discover AI prompts.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export { metadata };
export default RootLayout;
