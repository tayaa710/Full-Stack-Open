const Course = ({ course }) => (
    <div>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
    </div>

)

const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ parts }) => {
    const initialValue = 0;
    const totalExercises = parts.reduce((sum, part) => {
        return sum + part.exercises
    }, initialValue)


    return (
        <div>
            {parts.map(part => <Part key={part.id} part={part} />)}
            <p>
                <strong>total of {totalExercises} exercises</strong>
            </p>
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>




export default Course