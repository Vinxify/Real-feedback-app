import { createContext, useEffect } from "react";

import { useState } from "react";
import FeedbackData from "../components/data/FeedbackData.jsx";
import API_URL from "../components/config/API_URL.js";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(FeedbackData);
  const [webError, setWebError] = useState("");
  const [flag, setFlag] = useState(false);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  // use to handle

  useEffect(() => {
    fetchFeedback();
    setWebError("");
    setFlag(false);
  }, [flag ? flag : null]);
  // console.log(feedback);

  const fetchFeedback = async () => {
    // try {
    //   setIsLoading(true);
    //   const response = await fetch(`${API_URL}?_sort=id&_order=desc`);
    //   if (!response.ok) throw new Error("Something went wrong");
    //   const data = await response.json();
    //   setFeedback(data);
    // } catch (err) {
    //   setWebError(`${err.message}`);
    // } finally {
    // }

    let feedback = JSON.parse(localStorage.getItem("myData")) || [];
    setFeedback(feedback);
    setIsLoading(false);

    // console.log(feedback);
  };

  // Add feedback
  const addFeedback = (newFeedback) => {
    // try {
    //   // const response = await fetch(API_URL, {
    //   //   method: "POST",
    //   //   headers: { "Content-Type": "application/json" },
    //   //   body: JSON.stringify(newFeedback),
    //   // });
    //   // if (!response || !response.ok) throw new Error("something went wrong");
    //   // const data = await response.json();

    //   // setFeedback([data, ...feedback]);

    // } catch (err) {
    //   setWebError(`${err.message}`);
    // }

    let feedbackData = JSON.parse(localStorage.getItem("myData")) || [];
    let myFeedbackData = [newFeedback, ...feedbackData];
    // myFeedback.push(newFeedback);
    localStorage.setItem("myData", JSON.stringify(myFeedbackData));

    if (myFeedbackData.length > feedbackData.length) {
      setFlag(true);
    }
  };

  // Delete feedback
  const deleteFeedback = (id) => {
    // try {
    //   if (window.confirm("Are you sure that you want to delete")) {
    //     const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    //     if (!response && !response.ok) throw new Error("Error from deleting");

    //     setFeedback(feedback.filter((item) => item.id !== id));
    //   }
    // } catch (err) {
    //   setWebError(`${err.message}`);
    // }
    if (window.confirm("Are you sure that you want to delete")) {
      const storageData = JSON.parse(localStorage.getItem("myData"));
      let filterData = storageData.filter((item) => item.id !== id);
      localStorage.setItem("myData", JSON.stringify(filterData));
      if (filterData.length < storageData.length) {
        setFlag(true);
      }
    }
  };

  // updated feedback

  const updatedFeedback = (id, updatedItem) => {
    // try {
    //   const response = await fetch(`${API_URL}/${id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(updatedItem),
    //   });

    //   if (!response || !response.ok) throw new Error("something went wrong");

    //   const data = await response.json();

    //   setFeedback(
    //     feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    //   );
    // } catch (err) {
    //   console.error(`${err}`);
    //   setWebError(`${err}`);
    // }

    const storageData = JSON.parse(localStorage.getItem("myData"));
    const updateData = storageData.map((item) => {
      if (item.id === id) {
        item.text = updatedItem.text;
        item.rating = updatedItem.rating;
      }
      return item;
    });
    localStorage.setItem("myData", JSON.stringify(updateData));
    setFlag(true);
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        isLoading,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updatedFeedback,
        webError,
        setWebError,
        setFeedbackEdit,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
