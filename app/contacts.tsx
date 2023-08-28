'use client'
import { contact } from "@/types"
import { useState } from "react"
import Map from "./map"

export default function ContactsView({ contacts }: { contacts: contact[] }) {
    const [selected, setSelected] = useState<contact | null>(null)
    return (
        <div className="h-screen flex p-4 w-screen justify-between">
            <div className={"flex flex-col w-full md:w-1/2" + (selected !== null && " hidden md:block")}>
                <h1 className="text-2xl font-bold text-[#00A0DC]">Contacts</h1>
                <div className="flex overflow-y-scroll h-[90vh] flex-col mt-4">
                    {/* for alphabetical letter have the contacts under that letter */}
                    {
                        contacts.map((contact, index) => {
                            const show = index === 0 || contacts[index - 1].name.split(' ')[contacts[index - 1].name.split(' ').length - 1][0] !== contact.name.split(' ')[contact.name.split(' ').length - 1][0]
                            return (<div key={index} className="flex flex-col pr-6">
                                {show && <h1 className="text-xl border-b-4 border-[#0044ff35] font-bold mt-2 mb-1 text-[#00A0DC]">{contact.name.split(' ')[contact.name.split(' ').length - 1][0]}</h1>}
                                <button onClick={() => setSelected(contact)} className="text-xl w-fit text-left font-bold text-[#006699]">{contact.name}</button>
                            </div>)
                        })
                    }
                </div>
            </div>
            {
                selected !== null && (<div className="md:border-4 md:shadow border-[#0044ff35] flex flex-col overflow-scroll h-full rounded-lg md:p-4 md:w-1/2 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold text-[#00A0DC]">{selected.name}</h1>
                        <button className="text-l font-bold bg-[#00A0DC] p-1 rounded-lg text-white w-fit md:hidden" onClick={() => setSelected(null)}>Back</button>
                    </div>
                    
                    <div className="mt-4">
                        <p className="text-xl text-[#006699]">{selected.phone}</p>
                        <a href={`emailto:${selected.email}`} className="text-xl text-[#006699] underline">{selected.email}</a>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-xl font-bold text-[#00A0DC]">Company</h1>
                        <h2 className="text-xl text-[#006699]">{selected.company.name}</h2>
                        <p className="text-l text-[#006699]">{selected.company.catchPhrase}</p>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-xl font-bold text-[#00A0DC]">Address</h1>
                        <p className="text-xl text-[#006699]">{selected.address.street}, {selected.address.suite}</p>
                        <p className="text-xl text-[#006699]">{selected.address.city}, {selected.address.zipcode}</p>
                        <Map lng={parseFloat(selected.address.geo.lng)} lat={parseFloat(selected.address.geo.lat)} />
                    </div>
                </div>)
            }
        </div>
    )
}