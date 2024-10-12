import { useState } from 'react';

const [data, setData] = useState([
    {
        type: "page",
        name: "Page 1",
        x: 10,
        y: 10,
        width: 300,
        height: 300,
        elements: [
            {
                type: "frame",
                name: "Frame 2",
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                elements: [
                    {
                        type: "frame",
                        name: "Frame 3",
                        x: 10,
                        y: 10,
                        width: 100,
                        height: 100
                    },
                    {
                        type: "frame",
                        name: "Frame 7",
                        x: 350,
                        y: 250,
                        width: 100,
                        height: 100
                    }
                ]
            }
        ]
    },
    {
        type: "frame",
        name: "Frame 1",
        x: 450,
        y: 450,
        width: 400,
        height: 100
    },
    {
        type: "frame",
        name: "Frame 4",
        x: 350,
        y: 250,
        width: 100,
        height: 100,
        elements: [
            {
                type: "frame",
                name: "Frame 5",
                x: 350,
                y: 250,
                width: 100,
                height: 100
            },
            {
                type: "frame",
                name: "Frame 6",
                x: 350,
                y: 250,
                width: 100,
                height: 100
            }
        ]
    }
]);

function findFrameInfo(data, targetName) {
    let result = null;

    function traverse(elements, parent = null) {
        for (let element of elements) {
            if (element.name === targetName) {
                result = {
                    siblings: (parent ? parent.elements.filter(el => el.name !== targetName) : data.filter(el => el.name !== targetName)),
                    parent: parent ? parent.name : null
                };
                return;
            }
            if (element.elements) {
                traverse(element.elements, element);
                if (result) return;
            }
        }
    }

    traverse(data);
    return result;
}

// Example usage:
const frameInfo = findFrameInfo(data, "Page 1");
if (frameInfo) {
    console.log("Siblings:", frameInfo.siblings.map(el => el.name));
    console.log("Parent:", frameInfo.parent);
}
