import { useParams } from "react-router-dom"

export default function CompanyDetails() {
    const { companyId } = useParams();
    return (
        <section>
            <section>
                <p>{ companyId }</p>
            </section>
        </section>
    )
}