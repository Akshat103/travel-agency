import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";

const AdminNavbar = () => {
    const mobileSidebarToggle = (e) => {
        e.preventDefault();
        document.documentElement.classList.toggle("nav-open");
        const node = document.createElement("div");
        node.id = "bodyClick";
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle("nav-open");
        };
        document.body.appendChild(node);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand onClick={(e) => e.preventDefault()}>
                    Dashboard
                </Navbar.Brand>
                <Button
                    variant="light"
                    className="d-lg-none btn-fill rounded-circle p-2"
                    onClick={mobileSidebarToggle}
                >
                    <i className="fas fa-bars"></i>
                </Button>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
