"use client"

import React, { useState } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card"
import { Subscription, User } from "@/lib/schema.types"
import { Emoji } from "emoji-picker-react"
import EmojiPicker from "../global/emoji-picker"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Field, FieldValues, useForm } from "react-hook-form"
import { z } from "zod"
import { CreateWorkspaceFormSchema } from "@/lib/definitions"
import { Button } from "../ui/button"
import Loader from "../global/Loader"
import { UploadButton } from "@/lib/uploadThing"
interface DashboardSetupProps {
    user: User
    subscription: Subscription | null
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
    user,
    subscription,
}) => {
    const [selectedEmoji, setSelectedEmoji] = useState("💼")
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
        mode: "onChange",
        defaultValues: {
            logo: "",
            workspaceName: "",
        },
    })

    return (
        <Card className="w-[800px] sm:h-auto ">
            <CardHeader>
                <CardTitle>Create a workspace to get started</CardTitle>
                <CardDescription>
                    Craft your personal sanctuary for deep work—where your
                    thoughts, notes, and research come to life.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="">
                    <div className="flex flex-col gap-4 ">
                        <div className="flex items-center gap-4 ">
                            <div className="text-5xl">
                                <EmojiPicker
                                    getValue={(emoji) =>
                                        setSelectedEmoji(emoji)
                                    }
                                >
                                    {selectedEmoji}
                                </EmojiPicker>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <Label
                                    htmlFor="workspaceName"
                                    className="text-sm text-muted-foreground"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="workspaceName"
                                    type="text"
                                    placeholder="Workspace Name "
                                    className="bg-transparent"
                                    disabled={isLoading}
                                    {...register("workspaceName", {
                                        required: "Workspace name is required",
                                    })}
                                />
                                <small className="text-red-600">
                                    {errors?.workspaceName?.message?.toString()}
                                </small>
                            </div>
                        </div>
                        <div>
                            {" "}
                            <Label
                                htmlFor="Logo"
                                className="text-sm text-muted-foreground"
                            >
                                Workspace Logo
                            </Label>
                            <Input
                                id="Logo"
                                type="file"
                                accept="image/*"
                                placeholder="Logo"
                                className="bg-transparent"
                                disabled={isLoading}
                                {...register("logo", {
                                    required: "Workspace name is required",
                                })}
                            />
                            <small className="text-red-600">
                                {errors?.logo?.message?.toString()}
                            </small>
                            {subscription?.status !== "ACTIVE" && (
                                <small className="text-muted-foreground block">
                                    To customize your workspace, you need to be
                                    on a Pro Plan
                                </small>
                            )}
                        </div>{" "}
                        <div className=" border border-white rounded-xl px-4 py-2 flex items-center gap-2">
                            {/* <Button disabled={isLoading} type="submit">
                                {!isLoading ? "Create Workspace" : <Loader />}
                            </Button> */}
                            <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    // Do something with the response
                                    console.log("Files: ", res)
                                    alert("Upload Completed")
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`)
                                }}
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup
