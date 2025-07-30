import { Link } from "react-router-dom";
import { Button } from "../components/ui/button" // Adjust path based on your project
import { Card, CardContent } from "../components/ui/card";
import { Home, Code, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Error Code Display */}
        <div className="relative">
          <div className="text-8xl md:text-9xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            404
          </div>
          <div className="absolute inset-0 text-8xl md:text-9xl font-mono font-bold text-slate-700/20 blur-sm">
            404
          </div>
        </div>

        {/* Code Block Simulation */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="bg-slate-900/80 rounded-lg p-4 font-mono text-sm text-left">
              <div className="flex items-center gap-2 mb-3 text-slate-400">
                <Terminal className="w-4 h-4" />
                <span>compiler_error.log</span>
              </div>
              <div className="space-y-1">
                <div className="text-red-400">
                  <span className="text-slate-500">1 |</span> {"function findPage() {"}
                </div>
                <div className="text-red-400">
                  <span className="text-slate-500">2 |</span> {'  return page.find("404");'}
                </div>
                <div className="text-red-400">
                  <span className="text-slate-500">3 |</span> {"}"}
                </div>
                <div className="text-red-300 mt-2">
                  <span className="text-red-500">Error:</span> Page not found in compilation
                </div>
                <div className="text-yellow-400">
                  <span className="text-yellow-500">Warning:</span> Redirecting to safe route...
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Compilation Failed</h1>
          <p className="text-slate-300 text-lg max-w-md mx-auto">
            The page you're looking for seems to have a syntax error. Let's debug this together and get you back to
            coding!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Compiler
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            <Link to="/examples" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Browse Examples
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="pt-8 border-t border-slate-700">
          <p className="text-slate-400 text-sm mb-4">Need help? Try these popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/docs" className="text-blue-400 hover:text-blue-300 transition-colors">
              Documentation
            </Link>
            <Link to="/playground" className="text-blue-400 hover:text-blue-300 transition-colors">
              Code Playground
            </Link>
            <Link to="/tutorials" className="text-blue-400 hover:text-blue-300 transition-colors">
              Tutorials
            </Link>
            <Link to="/support" className="text-blue-400 hover:text-blue-300 transition-colors">
              Support
            </Link>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="absolute top-10 left-10 text-slate-700/30 animate-pulse">
          <Code className="w-8 h-8" />
        </div>
        <div className="absolute bottom-10 right-10 text-slate-700/30 animate-pulse delay-1000">
          <Terminal className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}
