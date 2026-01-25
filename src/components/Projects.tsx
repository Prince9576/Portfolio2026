const Projects = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            color: '#fff',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h1 style={{
                margin: '0 0 10px 0',
                fontSize: '24px',
                fontWeight: '700',
                color: '#fff'
            }}>
                My Projects
            </h1>
            <p style={{
                margin: '0',
                fontSize: '14px',
                color: '#aaa',
                textAlign: 'center'
            }}>
                Portfolio content goes here
            </p>
        </div>
    )
}

export default Projects;