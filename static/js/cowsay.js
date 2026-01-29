

class CowsayArgs
{
  /**
   * 
   * @param {URLSearchParams} query_args 
   */
  constructor(query_args)
  {
    this.message = query_args.get("message") ?? random_Thought();
    this.eyes = (query_args.get("eyes") ?? "oo").substring(0,2);
    this.tongue = (query_args.get("tongue") ?? "  ").substring(0,2);
    const cow_match = /.*?([\w_\-.]*?$)/gm.exec(decodeURIComponent(query_args.get("cowfile") ?? "default.cow"))
    console.log(cow_match);
    this.cow = cow_match.at(1) ?? "default.cow";
    if (this.cow.length == 0)
    {
      this.cow = "default.cow";
    }
    console.log(`${this.cow}`);
  }
}



function random_Thought()
{
  return "Hello\n\nworld"
}

function thoughts(message){
  let lines = message.split('\n');
  const longest_line = Math.max(...lines.map(str => str.length)); 
  lines = lines.map(str => str.padEnd(longest_line, " "))

  let ret = " " + "-".repeat(longest_line+2) + "\n";
  if (lines.length == 1)
  {
    ret += `< ${lines[0]} >\n`;
  }
  else
  {
    ret += `/ ${lines[0]} \\\n`;
    for (let i = 1; i < lines.length-1; i++)
    {
      ret += `| ${lines[i]} |\n`;
    }
    ret += `\\ ${lines[lines.length-1]} /\n`;
  }
  ret += " " + "-".repeat(longest_line+2) + "\n";

  return ret;
}
/**
 * 
 * @param {CowsayArgs} arg 
 */
async function buildCow(arg)
{
  let response = await fetch(`../cows/${arg.cow}`);
  let cow = await response.text();

  cow = cow.match(/(?<=;\n)([\s\S]*)(?=\nEOC)/gm)[0];
  cow = cow.replaceAll("\\\\", "\\")
  cow = cow.replaceAll("$thoughts", '\\');
  cow = cow.replace("$eyes", `${arg.eyes}`);
  cow = cow.replace("$tongue", `${arg.tongue}`);

  return thoughts(arg.message) + cow;
}
buildCow(new CowsayArgs(new URLSearchParams(window.location.search))).then(text => document.getElementById("cowsay").innerText = text);

