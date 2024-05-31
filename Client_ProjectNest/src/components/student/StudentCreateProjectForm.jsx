import { useEffect, useState } from "react";
import getTechIcon from "../../utils/getTechIcon";
import Button from "../Button";

const techStackOptions = [
  "React",
  "Vue",
  "Blockchain",
  "ML/AI",
  "NextJS",
  "NodeJS",
  "Tailwind",
  "HTML",
  "CSS",
  "Python",
  "Django",
  "PyTorch",
  "Pandas",
  "Numpy",
];

export default function StudentCreateProjectForm() {
  const [formData, setFormData] = useState({
    title: "",
    problem: "",
    solutions: "",
    resources: "",
    techTags: [],
  });

  const [techTagSearchTerm, setTechTagSearchTerm] = useState("");
  const [techTagSuggestions, setTechTagSuggestions] = useState([]);
  const [availableTechTags, setAvailableTechTags] = useState([]);

  //fetch availabe tech stack from backend here
  useEffect(function () {
    setAvailableTechTags([...techStackOptions]);
  }, []);

  useEffect(
    function () {
      const searchTerm = techTagSearchTerm.trim().toLocaleLowerCase();
      if (searchTerm.length < 2) {
        setTechTagSuggestions([]);
        return;
      }
      const filteredOptions = availableTechTags.filter(
        (tag) =>
          tag.toLowerCase().includes(searchTerm) &&
          !formData.techTags.includes(tag)
      );
      setTechTagSuggestions([...filteredOptions]);
    },
    [techTagSearchTerm, availableTechTags, formData.techTags]
  );

  function handleFormInputChange(e) {
    const { name, value } = e.target;
    setFormData((curr) => ({ ...curr, [name]: value }));
  }

  function handleSelectTechTag(selectedTag) {
    setTechTagSearchTerm("");

    setFormData((cur) => ({
      ...cur,
      techTags: [...cur.techTags, selectedTag],
    }));
    setTechTagSuggestions([]);
  }
  //submit logic here
  function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
  }

  function handleRemoveTechTag(tag) {
    setFormData((curr) => ({
      ...curr,
      techTags: curr.techTags.filter((techTag) => techTag !== tag),
    }));
  }

  return (
    <div className="fixed  bg-background z-40 p-3 rounded-lg top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 overflow-auto">
      <form
        className=" max-w-md p-2 flex flex-col gap-5 overflow-auto text-slate-300"
        onSubmit={handleSubmit}
      >
        <div>
          <label className=" text-slate-300">Title</label>
          <input
            required={true}
            onChange={handleFormInputChange}
            type="text"
            name="title"
            value={formData.title}
            className="py-2 px-3 outline-none text-whitef w-full bg-slate-600 rounded-md"
          ></input>
        </div>
        <div>
          <label>Problem Statement:</label>
          <textarea
            required={true}
            onChange={handleFormInputChange}
            type="text"
            name="problem"
            className="py-2 px-3 outline-none text-whitef w-full bg-slate-600 rounded-md"
          ></textarea>
        </div>
        <div>
          <label>Possible Solutions:</label>
          <textarea
            onChange={handleFormInputChange}
            type="text"
            name="solutions"
            className="py-2 px-3 outline-none text-whitef w-full bg-slate-600 rounded-md"
          ></textarea>
        </div>
        <div>
          <label>Resources:</label>
          <textarea
            onChange={handleFormInputChange}
            type="text"
            name="resources"
            className="py-2 px-3 outline-none text-whitef w-full bg-slate-600 rounded-md"
          ></textarea>
        </div>
        <div className="relative">
          <label>Tags:</label>
          <input
            type="text"
            className="py-2 px-3 outline-none  w-full bg-slate-600 rounded-md"
            onChange={(e) => setTechTagSearchTerm(e.target.value)}
            value={techTagSearchTerm}
          />

          <ul className="max-h-24 overflow-auto bg-slate-600 rounded-lg absolute w-full transition-all duration-200">
            {techTagSuggestions.map((tag) => (
              <SuggestionListItem
                key={tag}
                tag={tag}
                onClick={() => handleSelectTechTag(tag)}
              />
            ))}
          </ul>

          <div className="grid gap-2 grid-cols-3">
            {formData.techTags.map((tag) => (
              <TagPill
                key={tag}
                tag={tag}
                onClick={() => handleRemoveTechTag(tag)}
              />
            ))}
          </div>
        </div>
        <Button onClick={() => {}}>Create</Button>
      </form>
    </div>
  );
}

function SuggestionListItem({ tag, onClick }) {
  return (
    <li
      className="flex items-center gap-2 hover:bg-slate-700 cursor-pointer p-2 transition-all duration-200"
      onClick={onClick}
    >
      {getTechIcon(tag)}
      {tag}
    </li>
  );
}

function TagPill({ tag, onClick }) {
  return (
    <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-md mt-2">
      {getTechIcon(tag)}
      {tag}
      <span className=" text-red-600/70 cursor-pointer hover:text-red-500 transition-colors duration-200">
        <span onClick={onClick}>&#10005;</span>
      </span>
    </div>
  );
}