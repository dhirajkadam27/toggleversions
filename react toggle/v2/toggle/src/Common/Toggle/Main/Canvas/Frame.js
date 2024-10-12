import './Frame.css';

function Frame({name,x,y}) {

  return (name?.map(function(applicant1 ,index1) {
            return (
              <g key={index1}>
              <rect
                name={applicant1.name}
                className='frame'
                x={x+applicant1.x}
                y={y+applicant1.y}
                width={applicant1.width}
                height={applicant1.height}
                fill={applicant1.color}
              />
              {(applicant1.StrokeU)?<rect
                x={x+applicant1.x}
                y={y+applicant1.y}
                width={applicant1.width}
                height={applicant1.strokeWidth}
                fill={applicant1.strokeColor}
              />:null}
              {(applicant1.StrokeD)?<rect
                x={x+applicant1.x}
                y={y+applicant1.y+applicant1.height-applicant1.strokeWidth}
                width={applicant1.width}
                height={applicant1.strokeWidth}
                fill={applicant1.strokeColor}
              />:null}
              {(applicant1.StrokeL)?<rect
                x={x+applicant1.x}
                y={y+applicant1.y}
                width={applicant1.strokeWidth}
                height={applicant1.height}
                fill={applicant1.strokeColor}
              />:null}
              {(applicant1.StrokeR)?<rect
                x={x+applicant1.x+applicant1.width-applicant1.strokeWidth}
                y={y+applicant1.y}
                width={applicant1.strokeWidth}
                height={applicant1.height}
                fill={applicant1.strokeColor}
              />:null}
               <Frame name={applicant1.elemets} x={x+applicant1.x} y={y+applicant1.y}/>
              </g>
              )
          }))
        
        }

  
  export default Frame;
  