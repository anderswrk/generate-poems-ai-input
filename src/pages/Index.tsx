import PoemGenerator from "@/components/PoemGenerator";
import { Feather } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Feather className="h-12 w-12 text-purple-600" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Poem Generator
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your thoughts into beautiful poetry with the power of AI
          </p>
        </div>

        <PoemGenerator />

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Powered by advanced AI • Created with ❤️ for poetry lovers</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
