# React Image Carousel App

This is a brief introduction to the image carousel app. This app was built as a challenge by Meliotech where I was expected to build a dynamic carousel that would allow users to upload images of their products using React.
![Screenshot 2025-04-06 at 13 01 26](https://github.com/user-attachments/assets/4c30c536-850e-4386-8253-d4c389dbe331)

## Tech Stack
* React 18 + Vite (Framework)
* TypeScript (Language)
* Tailwind CSS (as our UI library for styling our logic)
* Daisy UI (tailwind component UI)

## How to run
1. Clone the project from GitHub
2. Make sure Node is installed on your device, check node version
```bash
node -v
```
3. Open the app on VSCode (open as folder)
4. Install the app's dependencies (use VSCode terminal)
```bash
npm i
```
5. Run the app
```bash
npm run dev
```
A link will appear on the terminal (similar to http://localhost:5173); click on the link, which will open the app in your default browser.

## Logic
This app is made up of 3 components
* The Navbar (nested in the root component - app.tsx)
* The product page (nested in the root component - app.tsx)
* The modal pop-up component (nested in the product page component - product.tsx)

### Navbar component
Simple component made using Daisy UI components. Contains the logo name, cart icon, and image of the developer

### Product page component
This product page contains the title, image carousels (from Daisy UI), and a button to open the modal component. Initially, it contains a single image, but users can click on the *add image* button to add new images to the carousel.
Dynamic image item:
```js
// dynamic image slider for changing the state of the image (slide to another image)
  const [sliders, setSliders] = useState([
    {
      id: "slide1",
      img: bag,
    },
  ]);
```
function to add an image to our dynamic image item and carousel:
```js
 // function to add image to slider
  const addImageToSliders = (imageUrl: string) => {
    const newSlide = {
      id: `slide${sliders.length + 1}`,
      img: imageUrl,
    };
    setSliders((prevSliders) => [...prevSliders, newSlide]);
  };
```
Our dynamic carousel
```js
 <div className="carousel w-fit ">
  {sliders.map((slider, index) => (
    <div
      key={slider.id}
      id={slider.id}
      className={`carousel-item relative w-full ${
        index === currentSlide ? "block" : "hidden"
      }`}
    >
      <img src={slider.img} className="w-full rounded-xl" />
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
        <button onClick={handlePrev} className="btn btn-circle">
          ❮
        </button>
        <button onClick={handleNext} className="btn btn-circle">
          ❯
        </button>
      </div>
    </div>
  ))}
</div>
```
### Modal Component
This component allows the user to dynamically add a new image to the carousel. The component was built using Daisy UI. The modal has an input button that allows users to select an image from their device, which will then be previewed on top. If the user is satisfied with the image then they can click on the submit image button to add the image to the carousel on the product page.

simple function to add a file using an event handler:
```js
function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
  if (e.target.files) {
    setFile(e.target.files[0]);
  }
}
```
function to add image to carousel (as a prop) to the product page when you click on the submit image button
```js
const handleSubmit = () => {
  if (file) {
    const imageUrl = URL.createObjectURL(file); // add new image to constant
    addImage(imageUrl); // set prop to new image
    setFile(null); // Clear the file after submission
    (document.getElementById("image_modal") as HTMLDialogElement).close(); // Close the modal
  }
};
```
Image preview in the modal component
```js
<div className="flex flex-col items-center space-y-2">
  {/** if no image show icon */}
  {!file && (
    <IoCloudUploadSharp size={60} className="opacity-30 mb-4" />
  )}
  {/** if image uploaded show image preview */}
  {file && (
    <img
      className="rounded-xl"
      src={URL.createObjectURL(file)}
      alt="Uploaded file preview"
    />
  )}
  {/** File input for uploading an image */}
  <input
    type="file"
    className="file-input btn-primary"
    onChange={handleFileChange}
  />
</div>
```
