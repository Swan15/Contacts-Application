'use client'
import { contact } from "@/types"
import { useState } from "react"
import Map from "./map"

export default function ContactsView({ contacts }: { contacts: contact[] }) {
    const [selected, setSelected] = useState<contact | null>(null)
    return (
        <div className="h-screen flex p-4 w-screen justify-between">
            <div className={"flex flex-col w-full md:w-1/2" + (selected !== null && " hidden md:block")}>
                <h1 className="text-2xl font-bold text-[#ADC4CE]">Contacts</h1>
                <div className="flex overflow-y-scroll h-[90vh] flex-col mt-4">
                    {/* for alphabetical letter have the contacts under that letter */}
                    {
                        contacts.map((contact, index) => {
                            const show = index === 0 || contacts[index - 1].name.split(' ')[contacts[index - 1].name.split(' ').length - 1][0] !== contact.name.split(' ')[contact.name.split(' ').length - 1][0]
                            return (<div key={index} className="flex flex-col pr-6">
                                {show && <h1 className="text-xl border-b-4 border-[#adc4ce6b] font-bold mt-2 mb-1 text-[#ADC4CE]">{contact.name.split(' ')[contact.name.split(' ').length - 1][0]}</h1>}
                                <button onClick={() => setSelected(contact)} className="text-xl w-fit text-left font-bold text-[#96B6C5]">{contact.name}</button>
                            </div>)
                        })
                    }
                </div>
            </div>
            {
                selected !== null && (<div className="md:border-4 md:shadow border-[#adc4ce6b] flex flex-col overflow-scroll h-full rounded-lg md:p-4 md:w-1/2 w-full">
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-2xl font-bold text-[#ADC4CE]">{selected.name}</h1>
                        <button className="text-l font-bold bg-[#96B6C5] p-1 rounded-lg text-[#EEE0C9] w-fit md:hidden" onClick={() => setSelected(null)}>Back</button>
                    </div>
                    
                    <div className="mt-4">
                        <p className="text-xl text-[#96B6C5]">{selected.phone}</p>
                        <a href={`emailto:${selected.email}`} className="text-xl text-[#96B6C5] underline">{selected.email}</a>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-xl font-bold text-[#96B6C5]">Company</h1>
                        <h2 className="text-xl text-[#96B6C5]">{selected.company.name}</h2>
                        <p className="text-l text-[#96B6C5]">{selected.company.catchPhrase}</p>
                    </div>
                    <div className="mt-4">
                        <h1 className="text-xl font-bold text-[#96B6C5]">Address</h1>
                        <p className="text-xl text-[#96B6C5]">{selected.address.street}, {selected.address.suite}</p>
                        <p className="text-xl text-[#96B6C5]">{selected.address.city}, {selected.address.zipcode}</p>
                        <Map lng={parseFloat(selected.address.geo.lng)} lat={parseFloat(selected.address.geo.lat)} />
                    </div>
                </div>)
            }
        </div>
    )
}