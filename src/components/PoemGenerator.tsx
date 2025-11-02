import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import functions from "@/lib/shared/kliv-functions";
import { useToast } from "@/hooks/use-toast";

const PoemGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [poem, setPoem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter some text",
        description: "Tell me what you'd like a poem about!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setPoem("");

    try {
      const response = await functions.post("generate-poem", { prompt });
      
      if (response.poem) {
        setPoem(response.poem);
      } else {
        throw new Error("No poem returned");
      }
    } catch (error) {
      console.error("Error generating poem:", error);
      toast({
        title: "Generation failed",
        description: "Unable to generate poem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      <div className="space-y-4">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter your inspiration... (e.g., 'a sunset over the ocean', 'the feeling of coming home', 'childhood memories')"
          className="min-h-[120px] text-lg resize-none focus-visible:ring-purple-400"
          disabled={isGenerating}
        />
        <Button
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-6 text-lg"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Crafting your poem...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Poem
            </>
          )}
        </Button>
      </div>

      {poem && (
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 mb-4 text-purple-600">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Your Poem</h3>
          </div>
          <div className="prose prose-lg max-w-none">
            <pre className="whitespace-pre-wrap font-serif text-gray-800 leading-relaxed text-lg">
              {poem}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
};

export default PoemGenerator;
