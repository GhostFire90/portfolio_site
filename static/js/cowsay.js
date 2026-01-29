

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
    this.cow = cow_match.at(1) ?? "default.cow";
    if (this.cow.length == 0)
    {
      this.cow = "default.cow";
    }
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

  cow = cow.match(/(?<=(EOC)|(;)|(EOC"))\n([\s\S]*)(?=\nEOC)/gm)[0];
  cow = cow.replaceAll("\\\\", "\\")
  cow = cow.replaceAll("\\@", "\@")
  cow = cow.replaceAll(/\$\{{0,1}thoughts\}{0,1}/gm, '\\');
  cow = cow.replace(/\$\{{0,1}eyes\}{0,1}/, `${arg.eyes}`);
  cow = cow.replace(/\$\{{0,1}tongue\}{0,1}/, `${arg.tongue}`);

  let msg_entry = document.getElementById("message_entry");
  let selection = document.getElementById("cowfile_select");
  if (msg_entry !== undefined)
  {
    msg_entry.value = arg.message;
  }
  if (selection !== undefined)
  {
    
    selection.selectedIndex = [...selection.options].map(x => x.text).findIndex(x => x === arg.cow);
  }


  return thoughts(arg.message) + cow;
}

function reload_with_args()
{
  const message = encodeURIComponent(document.getElementById("message_entry").value);
  const selection = document.getElementById("cowfile_select");
  const cowfile = encodeURIComponent(selection.options[selection.selectedIndex].text);
  let url = window.location.href
  url = url.match(/(.*?\/)*?cowsay(\.html){0,1}/)[0];
  url += `?message=${message}&cowfile=${cowfile}`;
  window.location.href = url;
}
buildCow(new CowsayArgs(new URLSearchParams(window.location.search))).then(text => document.getElementById("cowsay").innerText = text);
