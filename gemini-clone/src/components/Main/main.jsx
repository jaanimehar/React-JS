import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/context'
import { useContext } from 'react'


const main = () => {

  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, isListening, stopListening, startListening, handleGalleryClick, uploadedImage, } = useContext(Context)

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">

        {!showResult
          ? <>
            <div className="greet">
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggets beautyful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>

          </> : <div className='result'>
            <div className="result-tittle">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />

              {loading
                ? <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>

                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              }
            </div>
          </div>

        }
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type='text' placeholder='Ask Me' />
            <div>
              <img onClick={handleGalleryClick} src={assets.gallery_icon} alt="" />


              <img onClick={isListening ? stopListening : startListening} src={assets.mic_icon} alt="" />

              {input || uploadedImage ?
                (<img onClick={() => onSent()} src={assets.send_icon} alt="" />)
                : null}

              {uploadedImage && (
                <div style={{ marginTop: "10px" }}>
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "50%" }}
                  />
                </div>
              )}

            </div>
          </div>
          <p className="bottom-info">
            Gemini may display inaccurate info, including about people, so double-click its response. Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  )
}

export default main