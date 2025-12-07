import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from 'react';

export default function Index({ contacts }) {
    const [selectedContacts, setSelectedContacts] = useState([]);

    const toggleSelectAll = (checked) => {
        if (checked) {
            setSelectedContacts(contacts.map(contact => contact.id));
        } else {
            setSelectedContacts([]);
        }
    };

    const toggleSelect = (id, checked) => {
        if (checked) {
            setSelectedContacts([...selectedContacts, id]);
        } else {
            setSelectedContacts(selectedContacts.filter(contactId => contactId !== id));
        }
    };

    return (
        <AuthenticatedLayout
            header="Contacts"
        >
            <Head title="Contacts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>All Contacts</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                             <TableHead>ID</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {contacts.map((contact) => (
                                            <TableRow key={contact.id} data-state={selectedContacts.includes(contact.id) && "selected"}>
                                              
                                                
                                                <TableCell className="font-medium">{contact.id}</TableCell>
                                                <TableCell>{contact.name}</TableCell>
                                                <TableCell>{contact.email}</TableCell>
                                                
                                            </TableRow>
                                        ))}
                                        {contacts.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={5} className="h-24 text-center">
                                                    No contacts found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="mt-4 text-sm text-muted-foreground">
                                {selectedContacts.length} of {contacts.length} row(s) selected.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
