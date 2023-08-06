import React, { useState, useEffect } from "react";
import "../styles/FileTree.css";

function FileTree({
  containerArray,
  setContainerArray,
  containerState,
  setContainerState,
}) {
  const [dragType, setDragType] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
    e.dataTransfer.effectAllowed = "move";
    console.log("dragging container start");
    setDragType("container");
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const draggedIndex = +e.dataTransfer.getData("text/plain");

    // Check if it's a valid drop based on the drag type
    if (dragType === "group") {
      // Prevent dropping a container if it contains groups
      return;
    }

    const updatedContainerArray = [...containerArray];
    const [draggedContainer] = updatedContainerArray.splice(draggedIndex, 1);
    updatedContainerArray.splice(dropIndex, 0, draggedContainer);
    setContainerArray(updatedContainerArray);

    const updatedContainerStateArray = [...containerState];
    const [draggedContainerState] = updatedContainerStateArray.splice(
      draggedIndex,
      1
    );
    updatedContainerStateArray.splice(dropIndex, 0, draggedContainerState);
    setContainerState(updatedContainerStateArray);
  };

  const handleGroupDragStart = (e, containerIndex, groupIndex) => {
    console.log(containerIndex);
    console.log(groupIndex);
    e.dataTransfer.setData(
      "application/json", // Use "application/json" instead of "text/plain"
      JSON.stringify({ containerIndex, groupIndex })
    );
    e.dataTransfer.effectAllowed = "move";
    console.log("dragging group start");
    setDragType("group");
  };

  const handleGroupDragOver = (e, containerIndex, groupIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const handleGroupDrop = (e, containerIndex, groupIndex) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));

    if (dragType === "task") {
      // Prevent dropping a container if it contains groups
      return;
    }

    console.log("dragging group drop");

    const {
      containerIndex: draggedContainerIndex,
      groupIndex: draggedGroupIndex,
    } = draggedItem;

    console.log(draggedItem);

    const updatedContainerArray = [...containerArray];
    const draggedGroup = updatedContainerArray[
      draggedContainerIndex
    ].group.splice(draggedGroupIndex, 1)[0];

    console.log(draggedGroup);

    console.log(groupIndex);
    updatedContainerArray[containerIndex].group.splice(
      groupIndex,
      0,
      draggedGroup
    );
    setContainerArray(updatedContainerArray);

    const updatedContainerStateArray = [...containerState];
    const [draggedContainerState] = updatedContainerStateArray[
      draggedContainerIndex
    ].groups.splice(draggedGroupIndex, 1);
    updatedContainerStateArray[containerIndex].groups.splice(
      groupIndex,
      0,
      draggedContainerState
    );
    setContainerState(updatedContainerStateArray);
  };

  const handleTaskDragStart = (e, containerIndex, groupIndex, taskIndex) => {
    console.log(containerIndex);
    console.log(groupIndex);
    console.log(taskIndex);
    e.dataTransfer.setData(
      "application/json", // Use "application/json" instead of "text/plain"
      JSON.stringify({ containerIndex, groupIndex, taskIndex })
    );
    e.dataTransfer.effectAllowed = "move";
    console.log("dragging task start");
    setDragType("task");
  };

  const handleTaskDragOver = (e, containerIndex, groupIndex, taskIndex) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleTaskDrop = (e, containerIndex, groupIndex, taskIndex) => {
    e.preventDefault();
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));

    console.log("dragging group drop");

    const {
      containerIndex: draggedContainerIndex,
      groupIndex: draggedGroupIndex,
      taskIndex: draggedTaskIndex,
    } = draggedItem;

    console.log(draggedItem);

    const updatedContainerArray = [...containerArray];
    const draggedTask = updatedContainerArray[draggedContainerIndex].group[
      draggedGroupIndex
    ].tasks.splice(draggedTaskIndex, 1)[0];

    console.log(draggedTask);

    console.log(groupIndex);
    updatedContainerArray[containerIndex].group[groupIndex].tasks.splice(
      taskIndex,
      0,
      draggedTask
    );
    setContainerArray(updatedContainerArray);
  };

  const updateContainerState = (index) => {
    setContainerState((prevState) => {
      const newState = [...prevState];
      newState[index].state =
        newState[index].state === "collapse" ? "expand" : "collapse";
      return newState;
    });
  };

  const updateGroupState = (containerIndex, groupIndex) => {
    setContainerState((prevState) => {
      const newState = [...prevState];
      const groupState = newState[containerIndex].groups[groupIndex].state;
      newState[containerIndex].groups[groupIndex].state =
        groupState === "collapse" ? "expand" : "collapse";
      return newState;
    });
  };

  useEffect(() => {
    console.log(dragType);
  }, [dragType]);

  return (
    <div>
      {containerArray.map((container, containerIndex) => {
        return (
          <div
            key={containerIndex}
            draggable
            onDragStart={(e) => handleDragStart(e, containerIndex)}
            onDragOver={(e) => handleDragOver(e, containerIndex)}
            onDrop={(e) => handleDrop(e, containerIndex)}
            className="draggableContainer"
          >
            <div
              className="containerState"
              onClick={() => updateContainerState(containerIndex)}
            >
              <div className="stateIcon">
                {containerState[containerIndex].state === "collapse" ? (
                  <div>{">"}</div>
                ) : (
                  <div>{"v"}</div>
                )}
              </div>
              {container.title}
            </div>
            {containerState[containerIndex].state === "expand" && (
              <div
                className="groupContainer"
                onDrop={(e) => {
                  handleGroupDrop(
                    e,
                    containerIndex,
                    containerState[containerIndex].groups.length
                  );
                }}
              >
                {container.group.map((group, groupIndex) => {
                  return (
                    <div
                      draggable
                      onDragStart={(e) => {
                        e.stopPropagation();
                        handleGroupDragStart(e, containerIndex, groupIndex);
                      }}
                      onDragOver={(e) => {
                        e.stopPropagation();
                        handleGroupDragOver(e, containerIndex, groupIndex);
                      }}
                      onDrop={(e) => {
                        e.stopPropagation();
                        handleGroupDrop(e, containerIndex, groupIndex);
                      }}
                      className="draggableGroup"
                    >
                      <div
                        key={groupIndex}
                        className="containerState"
                        onClick={() =>
                          updateGroupState(containerIndex, groupIndex)
                        }
                      >
                        <div className="stateIcon">
                          {containerState[containerIndex].groups[groupIndex]
                            .state === "collapse" ? (
                            <div>{">"}</div>
                          ) : (
                            <div>{"v"}</div>
                          )}
                        </div>
                        {group.title}: {groupIndex}
                      </div>

                      {containerState[containerIndex].groups[groupIndex]
                        .state === "expand" && (
                        <div
                          className="groupContainer"
                          onDrop={(e) => {
                            handleTaskDrop(
                              e,
                              containerIndex,
                              groupIndex,
                              containerArray[containerIndex].group[groupIndex]
                                .tasks.length
                            );
                          }}
                        >
                          {group.tasks.length > 0 &&
                            group.tasks.map((task, taskIndex) => (
                              <div
                                key={taskIndex}
                                draggable
                                onDragStart={(e) => {
                                  e.stopPropagation();
                                  handleTaskDragStart(
                                    e,
                                    containerIndex,
                                    groupIndex,
                                    taskIndex
                                  );
                                }}
                                onDragOver={(e) => {
                                  e.stopPropagation();
                                  handleTaskDragOver(
                                    e,
                                    containerIndex,
                                    groupIndex,
                                    taskIndex
                                  );
                                }}
                                onDrop={(e) => {
                                  e.stopPropagation();
                                  handleTaskDrop(
                                    e,
                                    containerIndex,
                                    groupIndex,
                                    taskIndex
                                  );
                                }}
                              >
                                {task.title}
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FileTree;
