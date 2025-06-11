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
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { CreateWorkspaceFormSchema } from "@/lib/definitions"
import { Button } from "../ui/button"
import Loader from "../global/Loader"
import { UploadButton } from "@/lib/uploadThing"
import { createWorkspace } from "@/app/(main)/dashboard/queries"
interface DashboardSetupProps {
    user: User
    subscription: Subscription | null
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
    user,
    subscription,
}) => {
    const [selectedEmoji, setSelectedEmoji] = useState("💼")
    const [uploading, setUploading] = useState(false)
    const [Logo, setLogo] = useState<string>("")
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
    const onSubmit: SubmitHandler<
        z.infer<typeof CreateWorkspaceFormSchema>
    > = async (data) => {
        setUploading(true)
        try {
            const workspace = await createWorkspace({
                workspaceName: data.workspaceName,
                emoji: selectedEmoji,
                logo: Logo,
                userId: user.id,
            })
            console.log("Workspace Created: ", workspace)
        } catch (error) {
            console.error("Error creating workspace:", error)
        } finally {
            setUploading(false)
            reset()
        }
    }
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
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <div className="self-start">
                            <Label
                                htmlFor="Logo"
                                className="text-sm text-muted-foreground"
                            >
                                Workspace Logo
                            </Label>
                            <UploadButton
                                className="mt-2 ut-button:w-full ut-button:self-start ut-button:border ut-button:bg-transparent ut-button:px-4"
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                    // Do something with the response
                                    setLogo(res[0].ufsUrl)
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error.
                                    alert(`ERROR! ${error.message}`)
                                }}
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
                        </div>
                        <div className="self-end">
                            {/* <Button disabled={isLoading} type="submit">
                                {!isLoading ? "Create Workspace" : <Loader />}
                            </Button> */}
                            <button
                                type="submit"
                                disabled={uploading || isLoading}
                                className="text-white"
                            >
                                {uploading || isLoading ? (
                                    <Loader />
                                ) : (
                                    "Create Workspace"
                                )}
                            </button>
                            {/* <UploadButton
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
                            /> */}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default DashboardSetup
