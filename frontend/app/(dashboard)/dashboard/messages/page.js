'use client'
import { useState } from "react";   
import MessagesTable from "@/components/dashboard/messages/MessagesTable";
import MessagesToolbar from "@/components/dashboard/messages/MessagesToolbar";

export default function MessagesPage() {
    const [messagesLength, setMessagesLength] = useState(0);
    return (
        <div
            className="
                glass
                rounded-3xl
                border
                border-border
                p-6
                shadow-sm
            "
        >
            <MessagesToolbar messagesLength={messagesLength} />

            <MessagesTable setMessagesLength={setMessagesLength} />
        </div>
    );
}