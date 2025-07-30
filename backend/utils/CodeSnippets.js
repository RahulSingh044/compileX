function getHelloWorldCode(language) {
    const snippets = {
        python: `print("Hello, World!")`,
        javascript: `console.log("Hello, World!");`,
        java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
        'c#': `using System;

class Program {
    static void Main() {
        Console.WriteLine("Hello, World!");
    }
}`,
        ruby: `puts "Hello, World!"`,
        rust: `fn main() {
    println!("Hello, World!");
}`,
    };

    // Normalize language input
    const key = language.toLowerCase();
    return snippets[key] || "Unsupported language";
}

module.exports = { getHelloWorldCode };
