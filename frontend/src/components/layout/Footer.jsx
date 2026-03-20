// components/Footer.jsx
function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">
                    Starter Kit - © {new Date().getFullYear()} La Plateforme_
                </p>
            </div>
        </footer>
    );
}
export default Footer;