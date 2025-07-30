export function codeSnippet(language) {
    switch (language.toLowerCase()) {
      case 'python':
        return `def main():\n    # Read input from user\n    name = input("Enter your name: ")\n    print(f"Hello, {name}!")\n\n\nif __name__ == "__main__":\n    main()`;
  
      case 'c':
        return `#include <stdio.h>\n\nint main() {\n    char name[100];\n    printf("Enter your name: ");\n    scanf("%s", name);\n    printf("Hello, %s!\\n", name);\n    return 0;\n}`;
  
      case 'c++':
        return `#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string name;\n    cout << "Enter your name: ";\n    cin >> name;\n    cout << "Hello, " << name << "!" << endl;\n    return 0;\n}`;
  
      case 'java':
        return `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        System.out.print("Enter your name: ");\n        String name = sc.nextLine();\n        System.out.println("Hello, " + name + "!");\n    }\n}`;
  
      default:
        return '// Language not supported yet';
    }
  }
  