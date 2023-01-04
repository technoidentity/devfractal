import { Labels } from './Util'
import { OrganizationData } from '@specs/old/profile'
import Tree from 'react-d3-tree'

type HeirarchyProps = Readonly<{
  organizationData: OrganizationData
}>

export const Hierarchy = (props: HeirarchyProps) => {
  const nodeSize = { x: 200, y: 80 }

  const foreignObjectProps = {
    width: 180,
    height: 50,
    x: -120,
    y: -20,
  }

  return (
    <>
      <div className="max-w-full h-auto mt-4 md:mt-0 md:ml-4">
        <Labels value={'Organizational Structure'} />
        <div className="my-4 h-96 ">
          {' '}
          <Tree
            data={props.organizationData}
            orientation="horizontal"
            collapsible={true}
            pathFunc="diagonal"
            translate={{ x: 150, y: 190 }}
            nodeSize={nodeSize}
            renderCustomNodeElement={rd3tProps =>
              renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
            }
          />
        </div>
      </div>
    </>
  )
}

const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
}: any) => (
  <g>
    <foreignObject {...foreignObjectProps}>
      <div
        style={{ border: '2px solid black' }}
        className={
          nodeDatum.isLoggedIn
            ? 'bg-blue-600 rounded-lg relative  w-44 h-12 text-white'
            : 'bg-gray-200 rounded-lg relative  w-44 h-12'
        }
      >
        {
          <button style={{ width: '100%' }} onClick={toggleNode}>
            <h3 className="text-center font-bold ">{nodeDatum.name}</h3>
            <h3 className="text-center  ">{nodeDatum.position}</h3>
          </button>
        }
      </div>
    </foreignObject>
  </g>
)
