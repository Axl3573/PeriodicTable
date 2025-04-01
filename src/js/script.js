



document.querySelectorAll(".element").forEach((element) => {
  element.addEventListener("mouseenter", () => {
    element.classList.add("animation", "ring-4", "ring-black");
  });

  element.addEventListener("mouseleave", () => {
    element.classList.remove("animation", "ring-4", "ring-black");
    element.classList.add("deescalate");
    element.classList.remove("deescalate");
  });

  element.addEventListener("click", () => {
    const elementName = element.dataset.name;
    searchElement(elementName).then((elementInfo) => {
      if (elementInfo) 
      {
      const elementText = document.querySelector(".elementInformation h2");
      elementText.innerHTML = `Name: <strong class='font-bold'>${elementName}</strong><br>Symbol: <strong class='font-bold'>${elementInfo.symbol}</strong><br>Number: <strong class='font-bold'>${elementInfo.number}</strong>
      <br>Atomic Mass: <strong class='font-bold'>${elementInfo.atomic_mass}</strong><br>Period: <strong class='font-bold'>${elementInfo.ypos}</strong><br>Group: <strong class='font-bold'>${elementInfo.xpos}</strong>
      <br>Category: <strong class='font-bold'>${elementInfo.category}</strong>`;
      }
      else
      {
        console.log("Dont loaded.");
      }
    })
  });

  
});

async function loadElements() 
{
  try 
  {
    const response = await fetch("./../chemistry.json");
    if (!response.ok) 
    {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    console.log("Data loaded:", data);
    return data;
  } 
  catch (error) 
  {
    console.error("Error loading JSON: ", error);
    return null;
  }
}
  
 
async function searchElement(name) 
{
  const elements = await loadElements();
  if (!elements) 
    {
    console.error("Error loading JSON.");
    return;
  }

  const elementInfo = elements[name];

  if (!elementInfo) 
  {
    console.log(`Cant't find the elemento: "${name}".`);
  } 

  return elementInfo;
}




