import { addEdge, MarkerType } from "reactflow";
function addNewNode(
  setNodes: any,
  setEdges: any,
  currentNodeId: any,
  currentNode: any,
  parentId: number | null,
  activeHandle: any,
  nodeType: any,
  nodes: any,
) {
  const sourceNode = nodes.find((node: any) => node.id === currentNodeId);

  if (sourceNode) {
    sourceNode.data = {
      ...sourceNode.data,
      hasOutgoingConnection: true,
    };
    setNodes((prevNodes: any) => {
      return prevNodes.map((node: any) => (node.id === currentNodeId ? sourceNode : node));
    });
  }

  const lastNode = parentId === null ? currentNode : null;
  const margin = 80;

  const newPosition = {
    x: lastNode ? lastNode.position.x + lastNode.width + margin : 100,
    y: lastNode ? lastNode.position.y : 173,
  };

  const date_new = new Date();
  const newNodeId = `node${date_new.getTime()}`;

  if (currentNodeId) {
    const newEdge = {
      id: `edge-${Math.random()}`,
      source: currentNodeId,
      sourceHandle: activeHandle ? activeHandle : currentNodeId,
      target: newNodeId,
      targetHandle: newNodeId,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "#01CBD5",
      },
      style: {
        strokeWidth: 2,
        stroke: "#01CBD5",
      },
    };

    setEdges((prevEdges: any) => addEdge(newEdge, prevEdges));
  }

  const newNode = {
    id: newNodeId,
    type: nodeType,
    position: newPosition,
    data: {
      text: "",
      hasOutgoingConnection: false,
    },
  };

  setNodes((prevNodes: any) => [...prevNodes, newNode]);
}
export default addNewNode;
