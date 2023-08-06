import React, { useEffect, useState } from "react";
import FileTree from "./FileTree";
import "../styles/createContainer.css";
import axios from "axios";

function CreateContainer() {
  const [containerArray, setContainerArray] = useState([]);
  const [containerState, setContainerState] = useState([]);
  // container text
  const [containerText, setContainerText] = useState("");
  const [groupText, setGroupText] = useState("");
  const [taskText, setTaskText] = useState("");
  //container shake animation
  const [isContainerShaking, setIsContainerShaking] = useState(false);
  const [isGroupShaking, setIsGroupShaking] = useState(false);
  const [isTaskShaking, setIsTaskShaking] = useState(false);

  const [selectedContainer, setSelectedContainer] = useState(null); // Track the selected container
  const [selectedGroup, setSelectedGroup] = useState({
    index: null,
    state: null,
    containerIndex: null,
  }); // Track the selected container

  const [selectedTask, setSelectedTask] = useState({
    index: null,
    state: null,
    groupIndex: null,
    containerIndex: null,
  }); // Track the selected task

  const saveTasks = async () => {
    try {
      // Make a POST request to create a new task

      await axios.post("/handleTasks/saveTasks", {
        tasks: containerArray,
        state: containerState,
      });
    } catch (error) {
      console.error(error);
    }
  };

  //create a container
  const createContainer = () => {
    if (containerText.trim() === "") {
      setIsContainerShaking(true);
      setTimeout(() => {
        setIsContainerShaking(false);
      }, 500);
      return;
    }

    const newContainer = {
      title: containerText,
      group: [],
    };
    const newContainerState = {
      state: "collapse",
      groups: [],
    };
    setContainerArray([...containerArray, newContainer]);
    setContainerState([...containerState, newContainerState]);
    setContainerText("");
  };

  const saveEditContainer = () => {
    if (containerText.trim() === "") {
      setIsContainerShaking(true);
      setTimeout(() => {
        setIsContainerShaking(false);
      }, 500);
      return;
    }

    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedContainer].title = containerText;
      return updatedContainers;
    });

    setContainerState((prevContainersState) => {
      const updatedContainersState = [...prevContainersState];
      updatedContainersState[selectedContainer].state = "collapse";
      return updatedContainersState;
    });

    // setContainerText("");
    // setSelectedContainer(null);
  };

  const saveEditGroup = () => {
    if (groupText.trim() === "") {
      setIsGroupShaking(true);
      setTimeout(() => {
        setIsGroupShaking(false);
      }, 500);
      return;
    }

    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedContainer].group[selectedGroup.index].title =
        groupText;
      return updatedContainers;
    });

    setContainerState((prevContainersState) => {
      const updatedContainersState = [...prevContainersState];
      updatedContainersState[selectedContainer].groups[
        selectedGroup.index
      ].state = "collapse";
      return updatedContainersState;
    });
  };

  const saveEditTask = () => {
    if (taskText.trim() === "") {
      setIsTaskShaking(true);
      setTimeout(() => {
        setIsTaskShaking(false);
      }, 500);
      return;
    }

    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedTask.containerIndex].group[
        selectedTask.groupIndex
      ].tasks[selectedTask.index].title = taskText;
      return updatedContainers;
    });
  };

  const deleteContainer = () => {
    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers.splice(selectedContainer, 1);
      return updatedContainers;
    });
    setContainerState((prevContainersState) => {
      const updatedContainersState = [...prevContainersState];
      updatedContainersState.splice(selectedContainer, 1);
      return updatedContainersState;
    });
    setSelectedContainer(null);
    setContainerText("");
  };

  const deleteGroup = () => {
    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedContainer].group.splice(selectedGroup.index, 1);
      return updatedContainers;
    });
    setContainerState((prevContainersState) => {
      const updatedContainersState = [...prevContainersState];
      updatedContainersState[selectedContainer].groups.splice(
        selectedGroup.index,
        1
      );
      return updatedContainersState;
    });
    setSelectedGroup({
      index: null,
      state: null,
      containerIndex: null,
    });
    setGroupText("");
  };

  const deleteTask = () => {
    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedTask.containerIndex].group[
        selectedTask.groupIndex
      ].tasks.splice(selectedTask.index, 1);
      return updatedContainers;
    });
    setSelectedTask({
      index: null,
      state: null,
      groupIndex: null,
      containerIndex: null,
    });
    setTaskText("");
  };

  //create a group
  const createGroup = () => {
    if (groupText.trim() === "") {
      setIsGroupShaking(true);
      setTimeout(() => {
        setIsGroupShaking(false);
      }, 500);
      return;
    }

    const newGroup = {
      title: groupText,
      tasks: [],
    };
    const newGroupState = {
      state: "collapse",
    };

    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];
      updatedContainers[selectedContainer].group.push(newGroup);
      return updatedContainers;
    });
    setContainerState((prevContainersState) => {
      const updatedContainersState = [...prevContainersState];
      updatedContainersState[selectedContainer].groups.push(newGroupState);
      return updatedContainersState;
    });

    setGroupText("");
  };

  //create a task
  const createTask = () => {
    if (taskText.trim() === "") {
      setIsTaskShaking(true);
      setTimeout(() => {
        setIsTaskShaking(false);
      }, 500);
      return;
    }

    const newTask = {
      title: taskText,
    };

    setContainerArray((prevContainers) => {
      const updatedContainers = [...prevContainers];

      updatedContainers[selectedContainer].group[
        selectedGroup.index
      ].tasks.push(newTask);
      return updatedContainers;
    });

    console.log("createTask called");

    setTaskText("");
  };

  // handle key down event for create container
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (selectedContainer === null) {
        createContainer();
      } else {
        saveEditContainer();
      }
    }
  };
  // handle key down event for create group
  const handleKeyDownGroup = (e) => {
    if (e.key === "Enter") {
      if (selectedGroup.index === null) {
        createGroup();
      } else {
        saveEditGroup();
      }
    }
  };
  // handle key down event for create task
  const handleKeyDownTask = (e) => {
    if (e.key === "Enter") {
      if (selectedTask.index === null) {
        createTask();
      } else {
        saveEditTask();
      }
    }
  };
  //   handle select container, if selectedContainer is equal to an index and the user presses on it.
  //   It will set it to null as to deselect it, otherwise it will set the selected container index to the index that is passed in
  const handleSelectContainer = (containerIndex) => {
    if (selectedContainer === containerIndex) {
      console.log("de-selecting container");
      setSelectedContainer(null);
      setContainerText("");
    } else {
      console.log("selecting container");
      setSelectedContainer(containerIndex); // Set the selected container index
      setContainerText(containerArray[containerIndex].title); // Set the container text to the container title
    }
  };

  //   handle select group, if selectedGroup index is equal to an index and the user presses on it.
  //   It will set it to null as to deselect it, otherwise it will set the selected container index to the index that is passed in
  const handleSelectGroup = (groupIndex, containerIndex) => {
    if (
      selectedGroup.index === groupIndex &&
      selectedGroup.containerIndex === containerIndex
    ) {
      setSelectedGroup({
        index: null,
        state: null,
        containerIndex: null,
      });

      setSelectedTask({
        index: null,
        state: null,
        containerIndex: null,
      });
      setGroupText("");
      setTaskText("");
    } else {
      setSelectedGroup({
        index: groupIndex,
        state: "selecting",
        containerIndex: containerIndex,
      });
      setGroupText(containerArray[containerIndex].group[groupIndex].title);
    }
  };

  const handleSelectTask = (index, groupIndex, containerIndex) => {
    if (
      selectedTask.index === index &&
      selectedTask.groupIndex === groupIndex &&
      selectedTask.containerIndex === containerIndex
    ) {
      setSelectedTask({
        index: null,
        state: null,
        groupIndex: null,
        containerIndex: null,
      });
      setTaskText("");
    } else {
      setSelectedTask({
        index: index,
        state: "selecting",
        groupIndex: groupIndex,
        containerIndex: containerIndex,
      });
      setTaskText(
        containerArray[containerIndex].group[groupIndex].tasks[index].title
      );
    }
  };

  const [isSelectButtonVisible, setSelectButtonVisible] = useState(
    Array(containerArray.length).fill(null)
  );

  const toggleSelectButton = (containerIndex, isVisible) => {
    setSelectButtonVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[containerIndex] = isVisible;
      return updatedVisibility;
    });
  };

  const [isSelectGroupButtonVisible, setSelectGroupButtonVisible] = useState(
    containerArray.map((container) => Array(container.group.length).fill(null))
  );

  const toggleSelectGroupButton = (containerIndex, groupIndex, isVisible) => {
    setSelectGroupButtonVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[containerIndex] = [...prevVisibility[containerIndex]];
      updatedVisibility[containerIndex][groupIndex] = isVisible;
      return updatedVisibility;
    });
  };

  const [isSelectTaskButtonVisible, setSelectTaskButtonVisible] = useState(
    containerArray.map((container) =>
      container.group.map((group) => Array(group.tasks.length).fill(null))
    )
  );

  const toggleSelectTaskButton = (
    containerIndex,
    groupIndex,
    taskIndex,
    isVisible
  ) => {
    setSelectTaskButtonVisible((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[containerIndex] = [...prevVisibility[containerIndex]];
      updatedVisibility[containerIndex][groupIndex] = [
        ...prevVisibility[containerIndex][groupIndex],
      ];
      updatedVisibility[containerIndex][groupIndex][taskIndex] = isVisible;
      return updatedVisibility;
    });
  };
  useEffect(() => {
    console.log("selectedTask: " + selectedTask.state);
    if (selectedTask.state === "completed") {
      setSelectedTask((prevSelectedTask) => ({
        ...prevSelectedTask,
        state: null,
      }));
    } else if (selectedTask.state === "selecting") {
      setSelectedTask((prevSelectedTask) => ({
        ...prevSelectedTask,
        state: "completed",
      }));
    }
  }, [selectedTask]);

  useEffect(() => {
    console.log("selectedGroup: " + selectedGroup.state);

    if (selectedGroup.state === "completed") {
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        state: null,
      }));
    } else if (selectedGroup.state === "selecting") {
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        state: "completed",
      }));
      if (selectedTask.state === null) {
        setSelectedTask({
          index: null,
          state: null,
          groupIndex: null,
          containerIndex: null,
        });
        setTaskText("");
      }
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (selectedGroup.state === "selecting") {
      setSelectedGroup((prevSelectedGroup) => ({
        ...prevSelectedGroup,
        state: "completed",
      }));
    } else if (selectedGroup.state === null) {
      setSelectedGroup({
        index: null,
        state: null,
        containerIndex: null,
      });
      setSelectedTask({
        index: null,
        state: null,
        groupIndex: null,
        containerIndex: null,
      });
      setGroupText("");
      setTaskText("");
    }
  }, [selectedContainer]);

  useEffect(() => {
    // Hide the select button when a container is selected
    if (isSelectButtonVisible) {
      //   console.log(isSelectButtonVisible);
    }
  }, [isSelectButtonVisible]);

  useEffect(() => {
    // Hide the select button when a container is selected
    if (isSelectGroupButtonVisible) {
      //   console.log(isSelectGroupButtonVisible);
    }
  }, [isSelectGroupButtonVisible]);

  useEffect(() => {
    // Hide the select button when a container is selected
    if (isSelectTaskButtonVisible) {
      //   console.log(isSelectTaskButtonVisible);
    }
  }, [isSelectTaskButtonVisible]);

  useEffect(() => {
    console.log("containerArray:");
    console.log(containerArray);
    setSelectGroupButtonVisible(
      containerArray.map((container) =>
        Array(container.group.length).fill(null)
      )
    );
    setSelectTaskButtonVisible(
      containerArray.map((container) =>
        container.group.map((group) => Array(group.tasks.length).fill(null))
      )
    );
  }, [containerArray]);

  useEffect(() => {
    console.log(containerState);
  }, [containerState]);

  useEffect(() => {
    // Fetch all tasks on component load
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("/handleTasks/getTasks");
      console.log(response.data.tasks);
      console.log(response.data.state);

      setContainerArray(response.data.tasks);
      setContainerState(response.data.state);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ marginTop: "20px", display: "flex" }}>
      <div className="containersOuterDiv">
        <div className="containers">
          <div className="">
            <div className="inputFieldsContainer">
              <div className="textInputDiv">
                <input
                  type="text"
                  value={containerText}
                  onChange={(e) => setContainerText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="container text"
                  className={`containerText ${
                    isContainerShaking ? "shake" : ""
                  }`}
                />
              </div>
              <div>
                {selectedContainer === null ? (
                  <div id="createContainerOuterDiv" onClick={createContainer}>
                    <div className="textZero">
                      <div>Create New Container</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="task-icon"
                    >
                      <path
                        d="M12 2v20m10-10H2"
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="actionsOuterDiv">
                    <div
                      id="createContainerOuterDiv"
                      onClick={saveEditContainer}
                    >
                      <div className="textZero">
                        <div>Save Container Edit</div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="task-icon-save"
                      >
                        <path
                          d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          strokeWidth="4"
                          fill="green"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="deleteButton" onClick={deleteContainer}>
                        <span className="material-icons custom-icon-style">
                          delete
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="inputFieldsContainer">
              <div className="textInputDiv">
                <input
                  type="text"
                  value={groupText}
                  onChange={(e) => setGroupText(e.target.value)}
                  onKeyDown={handleKeyDownGroup}
                  placeholder="group text"
                  className={`${
                    selectedContainer === null
                      ? "groupTextDisabled"
                      : "containerText"
                  }  ${isGroupShaking ? "shake" : ""}`}
                  disabled={selectedContainer === null} // Disable the input if no container is selected
                />
              </div>
              <div>
                {selectedGroup.index === null ? (
                  <div id="createContainerOuterDiv" onClick={createGroup}>
                    <div className="textZero">
                      <div>Create New Group</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="task-icon"
                    >
                      <path
                        d="M12 2v20m10-10H2"
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="actionsOuterDiv">
                    <div id="createContainerOuterDiv" onClick={saveEditGroup}>
                      <div className="textZero">
                        <div>Save Group Edit</div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="task-icon-save"
                      >
                        <path
                          d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          strokeWidth="4"
                          fill="green"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="deleteButton" onClick={deleteGroup}>
                        <span className="material-icons custom-icon-style">
                          delete
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="inputFieldsContainer">
              <div className="textInputDiv">
                <input
                  type="text"
                  value={taskText}
                  onChange={(e) => setTaskText(e.target.value)}
                  onKeyDown={handleKeyDownTask}
                  placeholder="task text"
                  className={`${
                    selectedGroup.index === null
                      ? "groupTextDisabled"
                      : "containerText"
                  }  ${isTaskShaking ? "shake" : ""}`}
                  disabled={selectedGroup.index === null} // Disable the input if no container is selected
                />
              </div>
              <div>
                {selectedTask.index === null ? (
                  <div id="createContainerOuterDiv" onClick={createTask}>
                    <div className="textZero">
                      <div>Create New Task</div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="task-icon"
                    >
                      <path
                        d="M12 2v20m10-10H2"
                        stroke="black"
                        strokeWidth="4"
                        fill="none"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="actionsOuterDiv">
                    <div id="createContainerOuterDiv" onClick={saveEditTask}>
                      <div className="textZero">
                        <div>Save Task Edit</div>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        className="task-icon-save"
                      >
                        <path
                          d="M9 16.17l-4.17-4.17-1.42 1.41L9 19 21 7l-1.41-1.41z"
                          strokeWidth="4"
                          fill="green"
                        />
                      </svg>
                    </div>
                    <div>
                      <div className="deleteButton" onClick={deleteTask}>
                        <span className="material-icons custom-icon-style">
                          delete
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <FileTree
                containerArray={containerArray}
                setContainerArray={setContainerArray}
                containerState={containerState}
                setContainerState={setContainerState}
              />
            </div>
          </div>
        </div>
        <div className="saveBtn" onClick={saveTasks}>
          Save
        </div>
      </div>
      <div className="containers">
        <div>
          {containerArray?.map((container, containerIndex) => (
            <div
              className={`innerContainers ${
                selectedContainer === containerIndex ? "selected" : "unselected"
              }`}
              key={containerIndex}
              onClick={() => handleSelectContainer(containerIndex)}
              onMouseEnter={() => toggleSelectButton(containerIndex, true)}
              onMouseLeave={() => toggleSelectButton(containerIndex, null)}
            >
              <div className="reqContainer">
                <div className="textThree">{container.title}</div>
                <div
                  className="reqContainerTexts"
                  onMouseEnter={() => toggleSelectButton(containerIndex, false)}
                  onMouseLeave={() => toggleSelectButton(containerIndex, true)}
                >
                  {Array.isArray(container.group) &&
                    container.group?.length > 0 &&
                    container.group?.map((group, groupIndex) => (
                      <div
                        className={`${
                          selectedGroup.index === groupIndex &&
                          selectedGroup.containerIndex === containerIndex
                            ? "selectedGroup"
                            : "unselectedGroup"
                        }`}
                        key={groupIndex}
                        onClick={(event) => {
                          if (selectedContainer === containerIndex) {
                            event.stopPropagation(); // Stop event propagation only if the parent is selected
                          }
                          handleSelectGroup(groupIndex, containerIndex);
                        }}
                        onMouseEnter={() =>
                          toggleSelectGroupButton(
                            containerIndex,
                            groupIndex,
                            true
                          )
                        }
                        onMouseLeave={() =>
                          toggleSelectGroupButton(
                            containerIndex,
                            groupIndex,
                            null
                          )
                        }
                      >
                        <div className="textTwo">{group.title}</div>
                        {Array.isArray(group.tasks) &&
                          group.tasks?.length > 0 && (
                            <div
                              className="taskText"
                              onMouseEnter={() =>
                                toggleSelectGroupButton(
                                  containerIndex,
                                  groupIndex,
                                  false
                                )
                              }
                              onMouseLeave={() =>
                                toggleSelectGroupButton(
                                  containerIndex,
                                  groupIndex,
                                  true
                                )
                              }
                              //here add mouse enter and leave
                            >
                              {Array.isArray(group.tasks) &&
                                group.tasks?.length > 0 &&
                                group.tasks?.map((task, taskIndex) => (
                                  <div
                                    className={`${
                                      selectedTask.index === taskIndex &&
                                      selectedTask.groupIndex === groupIndex &&
                                      selectedTask.containerIndex ===
                                        containerIndex
                                        ? "selectedTask"
                                        : "unselectedTask"
                                    }`}
                                    key={taskIndex}
                                    onClick={(event) => {
                                      if (
                                        selectedContainer === containerIndex &&
                                        selectedGroup.index === groupIndex
                                      ) {
                                        event.stopPropagation(); // Stop event propagation only if the parent is selected
                                        console.log(
                                          "propogation prevented group"
                                        );
                                      }
                                      handleSelectTask(
                                        taskIndex,
                                        groupIndex,
                                        containerIndex
                                      );
                                    }}
                                    onMouseEnter={() =>
                                      toggleSelectTaskButton(
                                        containerIndex,
                                        groupIndex,
                                        taskIndex,
                                        true
                                      )
                                    }
                                    onMouseLeave={() =>
                                      toggleSelectTaskButton(
                                        containerIndex,
                                        groupIndex,
                                        taskIndex,
                                        null
                                      )
                                    }
                                  >
                                    <div className="indivTexts" key={taskIndex}>
                                      {task.title}
                                    </div>
                                    {isSelectTaskButtonVisible[
                                      containerIndex
                                    ]?.[groupIndex]?.[taskIndex] === true &&
                                    selectedGroup.index === groupIndex &&
                                    selectedTask.index === taskIndex &&
                                    selectedTask.groupIndex ===
                                      groupIndex ? null : isSelectTaskButtonVisible[
                                        containerIndex
                                      ]?.[groupIndex]?.[taskIndex] === true ? (
                                      <button
                                        className="selectBtn"
                                        onClick={(event) => {
                                          if (
                                            selectedContainer ===
                                              containerIndex &&
                                            selectedGroup.index === groupIndex
                                          ) {
                                            event.stopPropagation(); // Stop event propagation only if the parent is selected
                                            console.log(
                                              "propogation prevented group"
                                            );
                                          }
                                          handleSelectTask(
                                            taskIndex,
                                            groupIndex,
                                            containerIndex
                                          );
                                        }}
                                      >
                                        select.t
                                      </button>
                                    ) : null}
                                  </div>
                                ))}
                            </div>
                          )}
                        {isSelectGroupButtonVisible[containerIndex]?.[
                          groupIndex
                        ] === true &&
                        selectedGroup.index === groupIndex &&
                        selectedGroup.containerIndex ===
                          containerIndex ? null : isSelectGroupButtonVisible[
                            containerIndex
                          ]?.[groupIndex] === true ? (
                          <button
                            className="selectBtn"
                            onClick={(event) => {
                              if (selectedContainer === containerIndex) {
                                event.stopPropagation(); // Stop event propagation only if the parent is selected
                                console.log("propogation prevented container");
                              }
                              handleSelectGroup(groupIndex, containerIndex);
                            }}
                          >
                            select.g
                          </button>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
              {isSelectButtonVisible[containerIndex] === true &&
                selectedContainer != containerIndex && (
                  <div>
                    <button
                      className="selectBtn"
                      onClick={() => handleSelectContainer(containerIndex)}
                    >
                      select.c
                    </button>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateContainer;
