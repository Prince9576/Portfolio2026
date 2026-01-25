import type { Project } from "../type";

const Projects = () => {
    const projects: Project[] = [
        {
            id: 'socials',
            name: 'Socials',
            url: 'xyz',
            description: 'Social Media website',
            cover: '/images/socials.png',
        },
        {
            id: 'sorting_visualizer',
            name: 'Sorting Visualizer',
            url: 'xyz',
            description: 'Sorting Visualizer',
            cover: '/images/sorting_visualiser.png',
        },
        {
            id: 'hobbyland',
            name: 'Hobbyland',
            url: 'xyz',
            description: 'Hobbyland',
            cover: '/images/hobbyland.png',
        },
        {
            id: 'foodsanta',
            name: 'FoodSanta',
            url: 'xyz',
            description: 'FoodSanta',
            cover: '/images/foodsanta.png',
        }
    ]
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '10px',
                width: '100%',
                height: '100%',
            }}>
                {projects.map((project) => (
                    <div key={project.id} style={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${project.cover})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Projects;