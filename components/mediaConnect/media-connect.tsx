import IGConnect from "./ig";
import TikTokConnect from "./tiktok";
import YoutubeConnect from "./youtube";


export default function MediaConnect() {
    return (
        
        <div
        className="md:border-black-200 w-full overflow-hidden shadow-xl md:max-w-2xl md:rounded-2xl md:border"
        style={{ zIndex: 1 }}
        >
            <div className="items-left border-back-200 flex flex-col justify-center space-y-3 border-b bg-white px-4 py-6 pt-8 text-center md:px-16">
                <h1 className="font-display text-3xl font-bold">
                    Connect your Social Media.
                </h1>
                <p className="text-sm">Supported:</p>
                < IGConnect />
                <p className="text-sm">In Development:</p>
                < TikTokConnect />
                < YoutubeConnect/>

            </div>
        </div>
      )
}